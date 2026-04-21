const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const database = require('./config/db');

// Middleware cho phép đọc dữ liệu JSON
app.use(express.json());

// Route cơ bản
app.get('/', (req, res) => {
    res.send('Chào mừng bạn đến với Node.js Backend!');
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

async function testDBConnection() {
    try {
        const [rows] = await database.query('SELECT 1 + 1 AS solution');
        console.log('Kết nối DB thành công, kết quả:', rows[0].solution);
    } catch (error) {
        console.error('Lỗi kết nối DB:', error);
    }
}

testDBConnection();