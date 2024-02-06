import { z } from "zod";

export const editNoteSchema = z.object({
  body: z.object({
    noteId: z.string(),
    newContent: z.string(),
  }),
});
