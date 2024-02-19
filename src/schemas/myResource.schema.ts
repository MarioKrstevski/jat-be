import { z } from "zod";

export const createMyResourceSchema = z.object({
  body: z.object({
    myResourceDetails: z.object({
      name: z.string(),
      link: z.string().url(),
      image: z.string().optional(),
      category: z.string(),
    }),
  }),
});

export const editMyResourceSchema = z.object({
  params: z.object({
    myResourceId: z.string(),
  }),
  body: z.object({
    myResourceDetails: z.object({
      name: z.string(),
      link: z.string().url(),
      image: z.string().optional(),
      category: z.string(),
    }),
  }),
});

export const deleteMyResourceSchema = z.object({
  params: z.object({
    myResourceId: z.string(),
  }),
});
