import db from "../models";
import bcrypt from "bcryptjs";
import { IUser, IAuthResponse, IRegisterRequest } from "../interfaces/user.interface";
import TokenService from "./token.service";
import MailService from "./sendmail.service";
const User = db.User;
const RefreshToken = db.RefreshToken;

class AuthService {

  async register(
    { username, email, password }: IRegisterRequest
  ) {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    return newUser;
  }

  async login(
    email: string,
    password: string,
  ) {

    const user = await User.findOne({ 
      where: { email }
    });
    if (!user) {
      throw new Error("Email không tồn tại");
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng");
    } 

    const accessToken = TokenService.generateAccessToken({
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = TokenService.generateRefreshToken({
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: user.user_id,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return { user: { ...user.toJSON(), password_hash: undefined }, accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
  try {
    // 1. Kiểm tra chữ ký và hạn dùng của Refresh Token
    const payload = TokenService.verifyRefreshToken(refreshToken) as { user_id: number; email: string; role: string };

    // 2. Kiểm tra sự tồn tại của Token này trong Database
    const storedToken = await db.RefreshToken.findOne({
      where: {
        token: refreshToken,
        userId: payload.user_id,
      },
    });

    if (!storedToken) {
      throw new Error("Refresh token không tồn tại hoặc đã bị thu hồi");
    }

    // 3. Kiểm tra xem token trong DB đã hết hạn chưa (ExpiredAt)
    if (new Date() > storedToken.expiredAt) {
      await storedToken.destroy(); // Xóa token hết hạn khỏi DB
      throw new Error("Refresh token đã hết hạn");
    }

    // 4. Tạo Access Token mới
    const newAccessToken = TokenService.generateAccessToken({
      user_id: payload.user_id,
      email: payload.email,
      role: payload.role,
    });

    return { accessToken: newAccessToken };
  } catch (error: any) {
    // Nếu lỗi là do JWT hết hạn hoặc không hợp lệ
    throw new Error(error.message || "Invalid refresh token");
  }
}

  async sendForgotPasswordEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error("Error occurred while processing forgot password request");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo OTP 6 chữ số
    TokenService.generateOtpToken({ email, otp });
    
    await MailService.sendOtpEmail(email, otp);
    return { message: "OTP đã được gửi đến email của bạn" };
  }

  async verifyOtpToken(otpToken: string, otp: string) {
    try {
      const payload = TokenService.verifyOtpToken(otpToken) as { email: string; otp: string };
      if (payload.otp !== otp) {
        throw new Error("OTP không đúng");
      }
      return { email: payload.email };
    } catch (error) {
      throw new Error("OTP không hợp lệ hoặc đã hết hạn");
    } 
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();
    return { message: "Đặt lại mật khẩu thành công" };
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      throw new Error("Mật khẩu hiện tại không đúng");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();
    return { message: "Đổi mật khẩu thành công" };
  }

  async logout(refreshToken: string) {
    await RefreshToken.destroy({ where: { token: refreshToken } });
    return { message: "Đăng xuất thành công" };
  }

}

export default new AuthService();