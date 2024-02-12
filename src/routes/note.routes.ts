import { Router } from "express";
import { zValidate } from "../middleware/validateZod.middleware";
import { editNoteSchema } from "../schemas/note.schema";
import { editNote } from "../controllers/note.controller";

const notes = Router();

notes.patch("/:noteId", zValidate(editNoteSchema), editNote);
export default notes;
