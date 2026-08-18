import multer from "multer";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
const allowedMimeTypes = new Set([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const allowedExtensions = new Set([".pdf", ".docx"]);
export const documentUpload = multer({
    storage: multer.diskStorage({
        destination: os.tmpdir(),
        filename: (_req, file, callback) => {
            const extension = path.extname(file.originalname).toLowerCase();
            const generatedName = `${crypto.randomUUID()}${extension}`;
            callback(null, generatedName);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    },
    fileFilter: (_req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const validMimeType = allowedMimeTypes.has(file.mimetype);
        const validExtension = allowedExtensions.has(extension);
        if (!validMimeType || !validExtension) {
            callback(new Error("Only PDF and DOCX files are allowed"));
            return;
        }
        callback(null, true);
    },
});
//# sourceMappingURL=document-upload.middleware.js.map