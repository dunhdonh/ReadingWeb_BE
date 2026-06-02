import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import db from "./models"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Thay đổi nếu frontend chạy trên cổng khác
    credentials: true, // Cho phép gửi cookie
}))
const PORT: number = Number(process.env.PORT) || 3000;
// The project does not include src/config/db.ts; keep require and type as any to avoid compile errors.
const database: any = require("./config/config").database;

// Middleware cho phép đọc dữ liệu JSON
app.use(express.json());

app.use("/api", routes);

// Route cơ bản
app.get("/", (req: Request, res: Response) => {
  res.send("Chào mừng bạn đến với Node.js Backend!");
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

const testDBConnection = async () => {
  try {
    // Phải là db.sequelize.authenticate() hoặc db.sequelize.query()
    // Chứ không phải sequelize.query() trực tiếp nếu chưa khai báo
    await db.sequelize.authenticate(); 
    console.log('Kết nối DB thành công!');
  } catch (error) {
    console.error('Lỗi kết nối DB:', error);
  }
};

testDBConnection();
