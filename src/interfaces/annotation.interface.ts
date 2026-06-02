export interface IAnnotation {
    annotation_id?: number;
    user_id?: number;
    doc_id?: number;
    page_number?: number;
    content?: string | null;
    color_code?: string;
    created_at?: Date;
    updated_at?: Date;
}