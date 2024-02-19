import { z } from "zod";
import { validDateString } from "../utils/lib";

export const createInterviewSchema = z.object({
  body: z.object({
    interviewDetails: z.object({
      date: z
        .string()
        .nullish()
        .refine((val) => validDateString(val), {
          message: "Invalid date format",
        }),
      type: z.string(),
      format: z.string(),
      title: z.string(),
      location: z.string(),
      duration: z.string(),
      jobApplicationId: z.string().optional().nullable(),
    }),
  }),
});

export const editInterviewSchema = z.object({
  params: z.object({
    interviewId: z.string(),
  }),
  body: z.object({
    interviewDetails: z.object({
      date: z
        .string()
        .nullish()
        .refine((val) => validDateString(val), {
          message: "Invalid date format",
        }),
      type: z.string(),
      format: z.string(),
      title: z.string(),
      location: z.string(),
      duration: z.string(),
      jobApplicationId: z.string().optional().nullable(),
    }),
  }),
});

export const deleteInterviewSchema = z.object({
  params: z.object({
    interviewId: z.string(),
  }),
});
