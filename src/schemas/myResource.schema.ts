import { z } from "zod";

export const createMyResourceSchema = z.object({
  body: z.object({}),
});

export const editMyResourceSchema = z.object({
  params: z.object({
    myResourceId: z.string(),
  }),
  body: z.object({}),
});

export const deleteMyResourceSchema = z.object({
  params: z.object({
    myResourceId: z.string(),
  }),
});
