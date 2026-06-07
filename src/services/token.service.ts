import jwt from "jsonwebtoken";

class TokenService {

  generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
  }
  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  }

    generateRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
  }
    verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
  }

  generateOtpToken(payload: object) {
    return jwt.sign(payload, process.env.OTP_TOKEN_SECRET as string, { expiresIn: "15m" });
  }
  verifyOtpToken(token: string) {
    return jwt.verify(token, process.env.OTP_TOKEN_SECRET as string);
  }

  generateResetPasswordToken(payload: object) {
    return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN_SECRET as string, { expiresIn: "15m" });
  }
  verifyResetPasswordToken(token: string) {
    return jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET as string);
  }

}

export default new TokenService();