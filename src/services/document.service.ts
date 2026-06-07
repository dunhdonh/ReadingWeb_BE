import db from "../models";
import { IDocument } from "../interfaces/document.interface";
import { supabase } from "../config/supabase";
import { AsyncQueueError } from "sequelize";
import category from "../models/category";
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

  async updateDocumentMetadata(
    documentId: number,
    metadata: Partial<IDocument>,
  ) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    await document.update({
      title: metadata.title || document.title,
      description: metadata.description || document.description,
      price_credits: metadata.price_credits || document.price_credits,
      category_id: metadata.category_id || document.category_id,
    });
    return document;
  }

  async uploadAndReplaceDocumentFile(
    documentId: number,
    file: Express.Multer.File,
  ) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    const oldFileUrl = document.file_url;

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
    if (oldFileUrl) {
      const { error: deleteError } = await supabase.storage
        .from("documents")
        .remove([oldFileUrl]);
      if (deleteError) {
        throw new Error("Lỗi khi xóa file cũ: " + deleteError.message);
      }
    }
    await document.update({
      file_url: data?.path,
      file_type: fileExt === "pdf" ? "pdf" : "epub",
    });
    return data;
  }

  async uploadAndReplaceDocumentThumbnail(
    documentId: number,
    file: Express.Multer.File,
  ) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    const oldThumbnailUrl = document.thumbnail_url;

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

    if (oldThumbnailUrl) {
      const { error: deleteError } = await supabase.storage
        .from("public-assets")
        .remove([oldThumbnailUrl]);
      if (deleteError) {
        throw new Error("Lỗi khi xóa thumbnail cũ: " + deleteError.message);
      }
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

  async deleteDocument(documentId: number) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    
    if (document.file_url) {
      supabase.storage.from("documents").remove([document.file_url]);
    }
    if (document.thumbnail_url) {
      supabase.storage.from("public-assets").remove([document.thumbnail_url]);
    }

    await document.destroy();
    return true;
  }
}
export default new DocumentService();
