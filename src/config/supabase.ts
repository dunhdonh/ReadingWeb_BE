import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Đảm bảo load biến môi trường từ file .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Thiếu cấu hình Supabase trong file .env!");
}

// Khởi tạo client
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false // Dùng cho backend nên tắt lưu session
  }
});