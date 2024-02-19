import { z } from "zod";
import { validDateString } from "../utils/lib";

export const createDocumentSchema = z.object({
  body: z.object({
    documentDetails: z.object({
      label: z.string(),
      extension: z.string(),
      link: z.string().url(),
      type: z.string(),
    }),
  }),
});

export const editDocumentSchema = z.object({
  params: z.object({
    documentId: z.string(),
  }),
  body: z.object({
    documentDetails: z.object({
      label: z.string(),
      extension: z.string(),
      link: z.string().url(),
      type: z.string(),
    }),
  }),
});

export const deleteDocumentSchema = z.object({
  params: z.object({
    documentId: z.string(),
  }),
});
