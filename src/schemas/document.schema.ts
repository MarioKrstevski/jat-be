import { z } from "zod";
import { validDateString } from "../utils/lib";

export const createDocumentSchema = z.object({
  body: z.object({}),
});

export const editDocumentSchema = z.object({
  params: z.object({
    documentId: z.string(),
  }),
  body: z.object({}),
});

export const deleteDocumentSchema = z.object({
  params: z.object({
    documentId: z.string(),
  }),
});
