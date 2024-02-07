import { z } from "zod";

export const createContactSchema = z.object({
  body: z.object({
    contactData: z.object({
      name: z.string(),
    }),
  }),
});
