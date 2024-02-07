import { z } from "zod";

export const getCompanySchema = z.object({
  query: z.object({
    companyId: z.string(),
  }),
});

export const saveCompanySchema = z.object({
  body: z.object({
    companyId: z.string(),
  }),
});

export const requestCompanySchema = z.object({
  body: z.object({
    companyId: z.string(),
  }),
});
