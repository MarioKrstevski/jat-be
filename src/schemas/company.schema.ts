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
const urlRegex = /^(?:https?:\/\/)?(?:www\.)?[^\s.]+\.[^\s]+$/;
export const saveCustomCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    link: z.string().regex(urlRegex).optional(),
  }),
});
export const editCustomCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    link: z.string().regex(urlRegex).optional(),
    savedCompanyId: z.string(),
  }),
});

export const requestCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    link: z.string().regex(urlRegex).optional(),
  }),
});

export const deleteCustomCompanySchema = z.object({
  body: z.object({
    savedCompanyId: z.string(),
  }),
});
