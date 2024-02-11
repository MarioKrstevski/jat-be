import { z } from "zod";

export const getCompanySchema = z.object({
  params: z.object({
    companyId: z.string(),
  }),
});

export const saveExistingCompanySchema = z.object({
  params: z.object({
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
export const updateSavedCustomCompanySchema = z.object({
  params: z.object({
    savedCompanyId: z.string(),
  }),
  body: z.object({
    name: z.string(),
    link: z.string().regex(urlRegex).optional(),
  }),
});

export const requestCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    link: z.string().regex(urlRegex).optional(),
  }),
});

export const deleteCustomCompanySchema = z.object({
  params: z.object({
    savedCompanyId: z.string(),
  }),
});
