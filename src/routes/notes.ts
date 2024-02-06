import { Router } from "express";
import { zValidate } from "../middleware/validateZod.middleware";
import { editNoteSchema } from "../schemas/notes.schema";
import { editNote } from "../controllers/notes.controller";

const notes = Router();

notes.patch("/", zValidate(editNoteSchema), editNote);
export default notes;
