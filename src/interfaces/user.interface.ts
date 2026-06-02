export interface IUser {
    user_id?: number;          // Có dấu ? vì khi tạo mới (Register) chưa có ID
    username: string;
    email: string;
    password_hash: string;
    credit_balance?: number;   // Mặc định là 0
    is_premium?: boolean;      // Mặc định là false
    avatar_url?: string | null;
    role?: 'user' | 'admin';   // Chỉ cho phép 1 trong 2 giá trị này
    created_at?: Date;
    updated_at?: Date;
}

// Interface dành riêng cho dữ liệu gửi lên khi Đăng ký (Register Request)
export interface IRegisterRequest {
    username: string;
    email: string;
    password: string; // Password thuần người dùng gửi lên, chưa hash
}

// Interface dành riêng cho dữ liệu trả về sau khi Đăng nhập (Login Response)
export interface IAuthResponse {
    user: Omit<IUser, 'password_hash'>; // Trả về user nhưng loại bỏ mật khẩu
    accessToken: string;                      // accessToken JWT
}