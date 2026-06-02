import express from 'express';
import documentController from '../controllers/document.controller';
import { uploadDoc, uploadThumb } from '../middlewares/upload.middleware';

const router = express.Router();

//POST tạo document mới (trả về document_id để client biết đường dẫn upload file và thumbnail)
router.post('/create', documentController.initDocument);

//POST upload file và thumbnail (sử dụng multer middleware để xử lý file upload)
router.post('/:id/upload-file', uploadDoc.single('file'), documentController.uploadDocumentFile);

//POST upload thumbnail (sử dụng multer middleware để xử lý file upload)
router.post('/:id/upload-thumb', uploadThumb.single('file'), documentController.uploadDocumentThumbnail);

//GET tìm kiếm tài liệu theo tiêu đề, mô tả, hoặc tên thể loại
router.get('/search', documentController.searchDocuments);

//GET lấy metadata của tài liệu (không bao gồm file_url) để hiển thị chi tiết tài liệu
router.get('/:id/metadata', documentController.getDocumentById);

export default router;  