import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  editDocument,
  getDocuments,
} from "../controllers/document.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createDocumentSchema,
  deleteDocumentSchema,
  editDocumentSchema,
} from "../schemas/document.schema";

const documents = Router();

documents.get("/", getDocuments);
documents.post("/", zValidate(createDocumentSchema), createDocument);
documents.patch(
  "/:documentId",
  zValidate(editDocumentSchema),
  editDocument
);

documents.delete(
  "/:documentId",
  zValidate(deleteDocumentSchema),
  deleteDocument
);

export default documents;
