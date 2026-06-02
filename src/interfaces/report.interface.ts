export interface IReport {
    report_id?: number;
    reporter_id?: number;
    doc_id?: number;
    reason?: string;
    status?: "pending" | "reviewed" | "resolved";
    created_at?: Date;
    updated_at?: Date;
}