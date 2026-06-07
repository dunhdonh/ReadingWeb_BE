import {Request, Response} from "express";
import documentService from "../services/document.service";

class DocumentController {

    async initDocument(req: Request, res: Response) {
        try {
            const uploader_id = 1;
            const documentData = {...req.body, uploader_id};
            const newDocument = await documentService.createDocument(documentData);

            return res.status(201).json({
                success: true,
                message: "Document created successfully",
                data: {
                    doc_id: newDocument.document_id,
                    title: newDocument.title
                }
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateDocumentMetadata(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const metadata = req.body;
            const updatedDocument = await documentService.updateDocumentMetadata(Number(id), metadata);
            res.json({
                success: true,
                message: "Document metadata updated successfully",
                data: updatedDocument
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async uploadAndReplaceDocumentFile(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            
            const result = await documentService.uploadAndReplaceDocumentFile(Number(id), file);

            return res.status(200).json({
                success: true,
                message: "File uploaded successfully",
                data: result
            });
        } catch (error : any) {
            return res.status(500).json({
                success: false,
                message: "Error uploading file",
                error: error.message
            })
        }
    }

    async uploadAndReplaceDocumentThumbnail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const result = await documentService.uploadAndReplaceDocumentThumbnail(Number(id), file);

            return res.status(200).json({
                success: true,
                message: "Thumbnail uploaded successfully",
                data: result
            });
        } catch (error : any) {
            return res.status(500).json({
                success: false,
                message: "Error uploading thumbnail",
                error: error.message
            })
        }
    }

    async searchDocuments(req: Request, res: Response) {
        try {
            const { keyword } = req.query;
            const documents = await documentService.searchDocuments(keyword as string);
            res.json(documents);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getDocumentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const idStr = Array.isArray(id) ? id[0] : id;
            if (!idStr) {
                return res.status(400).json({ error: "Invalid or missing id parameter" });
            }
            const documentId = parseInt(idStr, 10);
            if (Number.isNaN(documentId)) {
                return res.status(400).json({ error: "id must be a valid number" });
            }
            const document = await documentService.getDocumentById(documentId);
            res.json(document);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteDocument(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const idStr = Array.isArray(id) ? id[0] : id;
            if (!idStr) {
                return res.status(400).json({ error: "Invalid or missing id parameter" });
            }
            const documentId = parseInt(idStr, 10);
            if (Number.isNaN(documentId)) {
                return res.status(400).json({ error: "id must be a valid number" });
            }
            const result = await documentService.deleteDocument(documentId);
            res.json({ 
                success: true, 
                message: "Document deleted successfully" 
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new DocumentController();