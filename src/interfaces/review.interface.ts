export interface IReview {
    review_id?: number;
    user_id?: number;
    doc_id?: number;
    rating?: number;
    comment?: string | null;
    created_at?: Date;
    updated_at?: Date;
}