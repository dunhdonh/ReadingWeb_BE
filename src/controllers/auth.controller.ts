import { Request, Response } from "express";
import authService from "../services/auth.service";

import { IUser, IAuthResponse, IRegisterRequest } from "../interfaces/user.interface";
import { ref } from "node:process";
class AuthController {
  async register(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body as IRegisterRequest;

      const result = await authService.register({ username, email, password });

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as { email: string; password: string };

      const result = await authService.login(email, password);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      });

      return res.status(200).json({
        success: true,
        data: {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        },
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async refreshAccessToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshAccessToken(refreshToken);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {

      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

    async forgotPassword(req: Request, res: Response) {
      try {
        const { email } = req.body;
        const result = await authService.sendForgotPasswordEmail(email);
        return res.status(200).json({
          success: true,
          data: result,
        });
      } catch (error: any) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }

    async verifyOtpToken(req: Request, res: Response) {
      try {
        const { email, otp } = req.body;
        const result = await authService.verifyOtpToken(email, otp);
        return res.status(200).json({
          success: true,
          data: result,
        });
      } catch (error: any) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }

      async resetPassword(req: Request, res: Response) {
        try {
          const { email, otp, newPassword } = req.body;
          const result = await authService.resetPassword(email, newPassword);
          return res.status(200).json({
            success: true,
            data: result,
          });
        } catch (error: any) {
          return res.status(400).json({
            success: false,
            message: error.message,
          });
        }
      }
}

export default new AuthController();
