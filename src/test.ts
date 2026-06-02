import { supabase } from './config/supabase';

const testConnection = async () => {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
        console.error('Lỗi kết nối Supabase:', error.message);
    } else {
        console.log('Kết nối thành công! Các buckets hiện có:', data);
    }
};

testConnection();