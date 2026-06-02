export interface IAdminLog {
    log_id?: number;
    admin_id?: number | null;
    action?: string | null;
    target_id?: number | null;
    created_at?: Date;
    updated_at?: Date;
}
