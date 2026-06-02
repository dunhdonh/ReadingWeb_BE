export interface IRefreshToken {
  refresh_token_id: number;
  token: string;
  userId: number;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}