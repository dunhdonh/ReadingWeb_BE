import express from "express";
import authController from "../controllers/auth.controller";
import verifyToken from "../middlewares/auth.middleware";

const router = express.Router();


// POST /api/auth/register
router.post("/register", authController.register);

// POST /api/auth/login
router.post("/login", authController.login);

// POST /api/auth/refresh-token
router.post("/refresh-token", authController.refreshAccessToken);   

// POST /api/auth/forgot-password
router.post("/forgot-password", authController.forgotPassword);

// POST /api/auth/verify-otp
router.post("/verify-otp", authController.verifyOtpToken);

// POST /api/auth/reset-password
router.post("/reset-password", authController.resetPassword);

export default router;
