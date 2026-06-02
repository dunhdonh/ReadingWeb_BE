export interface ICategory {
  category_id: number;
  name: string;
  parent_id?: number | null;
  created_at: Date;
  updated_at: Date;
}