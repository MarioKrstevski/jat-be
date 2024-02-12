import { z } from "zod";

export const editNoteSchema = z.object({
  params: z.object({
    noteId: z.string(),
  }),
  body: z.object({
    newContent: z.string(),
  }),
});
