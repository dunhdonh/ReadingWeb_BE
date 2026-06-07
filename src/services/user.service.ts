import db from "../models";
import { IUser } from "../interfaces/user.interface";

const User = db.User;

class UserService {
    async getUserById(userId: number) {
        const user = await User.findByPk(userId);
        return user;
    }

    async updateUserProfile(userId: number, profileData: Partial<IUser>) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        await user.update(profileData);
        return user;
    }

    async getUserCredits(userId: number) {
        const user = await User.findByPk(userId);
        return user ? user.credits : 0;
    }

    async getUserTransactionHistory(userId: number) {
        const user = await User.findByPk(userId, {
            include: [{
                model: db.Transaction,
                as: "transactions"
            }]
        });
        return user ? user.transactions : [];
    }

    async getUserStatistics(userId: number) {

        const booksReadCount = await db.ReadingProgress.count({
            where: { userId }
        });

        const totalDeposited = await db.Transaction.sum("amount", {
            where: { 
                userId, 
                type: "top-up" ,
                status: "completed"
            }
        });

        const totalSpent = await db.Transaction.sum("amount", {
            where: { 
                userId,
                type: "purchase",
                status: "completed"
            }
        });

        const user = await User.findByPk(userId, {
            attributes: [
                "credit_balance",
                "is_premium"
            ]
        });
        return {
            books_read: booksReadCount,
            current_balance: user?.credit_balance || 0,
            total_spent: Math.abs(totalSpent), 
            total_deposited: totalDeposited,
            is_premium: user?.is_premium || false
         };
    }
}

export default new UserService();