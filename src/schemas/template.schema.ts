import { z } from "zod";

export const createTemplateSchema = z.object({
  body: z.object({
    templateDetails: z.object({
      name: z.string(),
      content: z.string().max(3200),
      type: z.string(),
    }),
  }),
});

export const editTemplateSchema = z.object({
  params: z.object({
    templateId: z.string(),
  }),
  body: z.object({}),
});

export const deleteTemplateSchema = z.object({
  params: z.object({
    templateId: z.string(),
  }),
});
