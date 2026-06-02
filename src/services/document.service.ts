import db from "../models";
import { IDocument } from "../interfaces/document.interface";
import { supabase } from "../config/supabase";
const Document = db.Document;

class DocumentService {
  async createDocument(documentData: Partial<IDocument>) {
    const newDocument = await Document.create({
      uploader_id: documentData.uploader_id!,
      category_id: documentData.category_id!,
      title: documentData.title!,
      description: documentData.description || "",
      price_credits: documentData.price_credits || 0,
      status: documentData.status || "pending",
    });
    return newDocument;
  }

  async uploadDocumentFile(documentId: number, file: Express.Multer.File) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    const fileExt = file.originalname.split(".").pop();
    const fileName = `documents/${documentId}/${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    if (error) {
      throw new Error("Lỗi khi tải lên file: " + error.message);
    }
    await document.update({ 
        file_url: data?.path,
        file_type: fileExt === 'pdf' ? 'pdf' : 'epub'
     });
    return data;
  }

  async uploadDocumentThumbnail(documentId: number, file: Express.Multer.File) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    const fileExt = file.originalname.split(".").pop();
    const fileName = `public-assets/${documentId}/${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("public-assets")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    if (error) {
      throw new Error("Lỗi khi tải lên thumbnail: " + error.message);
    }
    await document.update({ thumbnail_url: data?.path });
    return data;
  }

  async searchDocuments(keyword: string) {
    const documents = await Document.findAll({
      where: {
        title: {
          [db.Sequelize.Op.like]: `%${keyword}%`,
        },
      },
    });
    return documents;
  }

  async getDocumentById(documentId: number) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    return document;
  }
}
export default new DocumentService();
