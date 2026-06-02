export interface ITransaction {
    transaction_id?: number;
    user_id?: number;
    amount?: number;
    transaction_date?: Date;
    type?: "upload_reward" | "purchase" | "top-up" | "refund";
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}