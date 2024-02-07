import { z } from "zod";

export const getCompanySchema = z.object({
  query: z.object({
    companyId: z.string(),
  }),
});

export const saveExistingCompanySchema = z.object({
  body: z.object({
    companyId: z.string(),
  }),
});
export const saveCustomCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    linkedin: z
      .string()
      .regex(/^(https?:\/\/)?([\w-]+\.)*linkedin\.com(\/.*)?$/),
  }),
});

export const requestCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    linkedin: z
      .string()
      .regex(/^(https?:\/\/)?([\w-]+\.)*linkedin\.com(\/.*)?$/),
  }),
});
