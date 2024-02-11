import { NextFunction, Request, Response, Router } from "express";
import {
  createTag,
  deleteTag,
  editTag,
  getTags,
} from "../controllers/jobApplicationTag.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createTagSchema,
  deleteTagSchema,
  editTagSchema,
} from "../schemas/jobApplicationTag.schema";
const tags = Router();

tags.post("/", zValidate(createTagSchema), createTag);

tags.get("/", getTags);

tags.patch("/:tagId", zValidate(editTagSchema), editTag);

tags.delete("/:tagId", zValidate(deleteTagSchema), deleteTag);

export default tags;
