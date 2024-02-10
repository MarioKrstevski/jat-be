import { z } from "zod";

export const createContactSchema = z.object({
  body: z.object({
    contactData: z.object({
      name: z.string(),
      relationship: z.string(), // "Co-worker","Friend","Referral","Other","Recruiter","Hiring Manager","Mentor", "Alumni"
    }),
  }),
});

export const editContactSchema = z.object({
  body: z.object({
    contactId: z.string(),
    contactData: z.object({
      name: z.string(),
      relationship: z.string(), // "Co-worker","Friend","Referral","Other","Recruiter","Hiring Manager","Mentor", "Alumni"
    }),
  }),
});

export const deleteContactSchema = z.object({
  body: z.object({
    contactId: z.string(),
  }),
});
