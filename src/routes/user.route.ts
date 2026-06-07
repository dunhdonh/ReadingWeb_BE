import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

// GET lấy thông tin profile của user
//tạm lấy userid từ params, sau này sẽ lấy từ token
router.get("/:id", userController.getUserProfile);

// PUT cập nhật thông tin profile của user
//tạm lấy userid từ params, sau này sẽ lấy từ token
router.put("/:id", userController.updateUserProfile);

// GET lấy số credit của user
//tạm lấy userid từ params, sau này sẽ lấy từ token
router.get("/:id/credits", userController.getUserCredits);

// GET lấy lịch sử giao dịch của user
//tạm lấy userid từ params, sau này sẽ lấy từ token
router.get("/:id/transactions", userController.getUserTransactionHistory);

// GET lấy thống kê của user
//tạm lấy userid từ params, sau này sẽ lấy từ token
router.get("/:id/statistics", userController.getUserStatistics);

export default router;