import multer from 'multer';

// Cấu hình lưu trữ tạm thời trong bộ nhớ (Memory Storage) 
// để đẩy trực tiếp lên Supabase mà không cần lưu vào ổ cứng server
const storage = multer.memoryStorage();

export const uploadDoc = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Giới hạn 50MB
  },
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép PDF và EPUB
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/epub+zip') {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận định dạng PDF hoặc EPUB!'));
    }
  }

});

export const uploadThumb = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // Ảnh bìa chỉ cần tối đa 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận định dạng ảnh (jpg, png, webp)!'));
    }
  }
});