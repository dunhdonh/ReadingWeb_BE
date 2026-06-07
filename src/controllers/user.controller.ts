import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {

    async getUserProfile(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const user = await userService.getUserById(userId);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: "User not found" });
        }
    }

    async updateUserProfile(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const profileData = req.body;
            const user = await userService.updateUserProfile(userId, profileData);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: "User not found" });
        }
    }

    async getUserCredits(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const credits = await userService.getUserCredits(userId);
            res.json({ credits });
        } catch (error) {
            res.status(404).json({ error: "User not found" });
        }
    }

    async getUserTransactionHistory(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const transactions = await userService.getUserTransactionHistory(userId);
            res.json(transactions);
        } catch (error) {
            res.status(404).json({ error: "User not found" });
        }
    }

        async getUserStatistics(req: Request, res: Response) {
            try {
                const userId = Number(req.params.id);
                const statistics = await userService.getUserStatistics(userId);
                res.json(statistics);
            } catch (error) {
                res.status(404).json({ error: "User not found" });
            }
        }
}

export default new UserController();