import { z } from "zod";

export const createTagSchema = z.object({
  body: z.object({
    color: z.string(),
    name: z.string(),
  }),
});
export const editTagSchema = z.object({
  body: z.object({
    color: z.string(),
    tagId: z.string(),
    name: z.string(),
  }),
});

export const deleteTagSchema = z.object({
  query: z.object({
    tagId: z.string(),
  }),
});
