import { z } from "zod";

export const createTagSchema = z.object({
  body: z.object({
    color: z.string(),
    name: z.string(),
  }),
});
export const editTagSchema = z.object({
  params: z.object({
    tagId: z.string(),
  }),
  body: z.object({
    newColor: z.string(),
    newName: z.string(),
    originalName: z.string(),
  }),
});

export const deleteTagSchema = z.object({
  params: z.object({
    tagId: z.string(),
  }),
});
