import { z } from "zod";
import { EditTypes } from "../types";
import { validDateString } from "../utils/lib";
export const createApplicationSchema = z.object({
  body: z.object({
    // userId: z.string().min(1, { message: "userId is required" }),
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

// export const getApplicationsSchema = z.object({
//   query: z.object({
//     userId: z.string().min(1, { message: "userId is required" }),
//   }),
// });

export const getApplicationSchema = z.object({
  query: z.object({
    // userId: z.string().min(1, { message: "userId is required" }),
    applicationId: z.string(),
  }),
});
export const archiveApplicationsSchema = z.object({
  body: z.object({
    // userId: z
    //   .string({ required_error: "userId is required" })
    //   .min(1, { message: "Cannot be an empty string" }),
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
]);
export const initialEditValidationSchema = z.object({
  body: z.object({
    type: EditTypes,
    // userId: z.string().min(1, { message: "userId is required" }),
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
        }), // Assuming jobTitle is also required
      companyName: z
        .string({
          required_error: "companyName is required",
        })
        .min(1, {
          message: "companyName must have at least one character",
        }), // Assuming companyName is also required
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
  } else {
    return null; // Or handle invalid type appropriately
  }
};

export const deleteApplicationsSchema = z.object({
  body: z.object({
    // userId: z
    //   .string({ required_error: "userId is required" })
    //   .min(1, { message: "Cannot be an empty string" }),
    ids: z
      .array(z.string(), { required_error: "Ids array is required" })
      .nonempty({ message: "Ids array must not be empty" }),
  }),
});
