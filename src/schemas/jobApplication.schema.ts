import { z } from "zod";
import { EditTypes } from "../types";
import { validDateString } from "../utils/lib";
export const createApplicationSchema = z.object({
  body: z.object({
    application: z.object(
      {
        status: z
          .string({ required_error: "status is required" })
          .min(1, {
            message: "status must have at least one character",
          }),
        jobTitle: z
          .string({
            required_error: "jobTitle is required",
          })
          .min(1, {
            message: "jobTitle must have at least one character",
          }),
        companyName: z
          .string({
            required_error: "companyName is required",
          })
          .min(1, {
            message: "companyName must have at least one character",
          }),
      },
      { required_error: "Application is required" }
    ),
  }),
});

export const getApplicationSchema = z.object({
  params: z.object({
    applicationId: z.string(),
  }),
});
export const archiveApplicationsSchema = z.object({
  body: z.object({
    ids: z
      .array(z.string(), { required_error: "Ids array is required" })
      .nonempty({ message: "Ids array must not be empty" }),
    isArchived: z.boolean(),
  }),
});

const EditTypes = z.enum([
  "allChange",
  "nextInterviewDateChange",
  "statusChange",
  "todosChange",
]);
export const initialEditValidationSchema = z.object({
  body: z.object({
    type: EditTypes,
  }),
  params: z.object({
    applicationId: z.string(),
  }),
});

export const allChangeSchema = z.object({
  body: z.object({
    application: z.object({
      status: z
        .string({ required_error: "status is required" })
        .min(1, {
          message: "status must have at least one character",
        }),
      jobTitle: z
        .string({
          required_error: "jobTitle is required",
        })
        .min(1, {
          message: "jobTitle must have at least one character",
        }),
      companyName: z
        .string({
          required_error: "companyName is required",
        })
        .min(1, {
          message: "companyName must have at least one character",
        }),
    }),
  }),
});

export const todosChangeSchema = z.object({
  body: z.object({
    application: z.object({
      todos: z.string(),
    }),
  }),
});
export const statusChangeSchema = z.object({
  body: z.object({
    application: z.object({
      status: z
        .string({ required_error: "status is required" })
        .min(1, {
          message: "status must have at least one character",
        }),
      nextStep: z.string().min(1).optional(),
      timeline: z.string().optional(),
    }),
  }),
});

export const nextInterviewDateSchema = z.object({
  body: z.object({
    application: z.object({
      nextInterviewDate: z
        .string()
        .nullish()
        .refine((val) => validDateString(val), {
          message: "Invalid date format",
        }),
    }),
  }),
});

export const editSchemaDecider = (type: EditTypes) => {
  if (type === "allChange") {
    return allChangeSchema;
  } else if (type === "statusChange") {
    return statusChangeSchema;
  } else if (type === "nextInterviewDateChange") {
    return nextInterviewDateSchema;
  } else if (type === "todosChange") {
    return todosChangeSchema;
  } else {
    return null; // Or handle invalid type appropriately
  }
};

export const deleteApplicationsSchema = z.object({
  body: z.object({
    ids: z
      .array(z.string(), { required_error: "Ids array is required" })
      .nonempty({ message: "Ids array must not be empty" }),
  }),
});
