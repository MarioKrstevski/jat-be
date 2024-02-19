import { Router } from "express";
import {
  createTemplate,
  deleteTemplate,
  editTemplate,
  getTemplates,
} from "../controllers/template.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createTemplateSchema,
  deleteTemplateSchema,
  editTemplateSchema,
} from "../schemas/template.schema";

const templates = Router();

templates.get("/", getTemplates);

templates.post("/", zValidate(createTemplateSchema), createTemplate);

templates.patch(
  "/:templateId",
  zValidate(editTemplateSchema),
  editTemplate
);

templates.delete(
  "/:templateId",
  zValidate(deleteTemplateSchema),
  deleteTemplate
);

export default templates;
