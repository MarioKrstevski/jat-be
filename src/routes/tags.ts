import { NextFunction, Request, Response, Router } from "express";
import {
  createTag,
  deleteTag,
  editTag,
  getTags,
} from "../controllers/tags.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createTagSchema,
  deleteTagSchema,
  editTagSchema,
} from "../schemas/tags.schema";
const tags = Router();

tags.post("/", zValidate(createTagSchema), createTag);

tags.get("/", getTags);

tags.patch("/", zValidate(editTagSchema), editTag);

tags.delete("/", zValidate(deleteTagSchema), deleteTag);

export default tags;
