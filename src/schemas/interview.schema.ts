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
      jobApplicationId: z.string().optional().nullable(),
      contactsIds: z.array(z.string()).optional(),
    }),
  }),
});
