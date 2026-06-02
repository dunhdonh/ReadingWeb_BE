import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, IAuthResponse, IRegisterRequest } from "../interfaces/user.interface";
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

    // Tạo JWT token
    const accessToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

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
    const payload = jwt.verify(
      refreshToken, 
      process.env.REFRESH_TOKEN_SECRET as string
    ) as any;

    // 2. Kiểm tra sự tồn tại của Token này trong Database
    // Đây là bước quan trọng để ngăn chặn token đã bị thu hồi (revoke)
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
    const newAccessToken = jwt.sign(
      { user_id: payload.user_id, email: payload.email, role: payload.role },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" } // Access token nên để hạn ngắn (15-30p)
    );

    return { accessToken: newAccessToken };
  } catch (error: any) {
    // Nếu lỗi là do JWT hết hạn hoặc không hợp lệ
    throw new Error(error.message || "Invalid refresh token");
  }
}

  async forgotPassword(
    email: string,
  ) {
    

  }

  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ) {

    // TODO:
    // verify otp
    // update password

  }

}

export default new AuthService();