// src/routes/users.ts
import { NextFunction, Request, Response, Router } from "express";
import {
  bulkArchiveApplications,
  bulkDeleteApplications,
  createApplication,
  editApplication,
  getApplication,
  getApplications,
} from "../controllers/applicationsController";
import { ZodError, z } from "zod";
import { zValidate } from "../middleware/validateZodMiddleware";
import { EditTypes } from "../types";

const applications = Router();

// GET /applications/:id
// POST /applications
// PATCH /applications/:id
// DELETE /applications/:id
// PATCH /applications/:id/archive
// DELETE /applications
// PATCH /applications/archive

// CREATE APPLICATION
// ---------------------------------------------

const createApplicationSchema = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "userId is required" }),
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
applications.post(
  "/",
  zValidate(createApplicationSchema),
  createApplication
);
// ---------------------------------------------

// GET APPLICATIONS
// ---------------------------------------------
const getApplicationsSchema = z.object({
  query: z.object({
    userId: z.string().min(1, { message: "userId is required" }),
  }),
});
applications.get(
  "/",
  zValidate(getApplicationsSchema),
  getApplications
);
// ---------------------------------------------

// GET APPLICATION
// ---------------------------------------------
const getApplicationSchema = z.object({
  query: z.object({
    userId: z.string().min(1, { message: "userId is required" }),
    applicationId: z.string(),
  }),
});
applications.get(
  "/:id",
  zValidate(getApplicationSchema),
  getApplication
);
// ---------------------------------------------

// ARCHIVE APPLICATIONS
// ---------------------------------------------
const archiveApplicationsSchema = z.object({
  body: z.object({
    userId: z
      .string({ required_error: "userId is required" })
      .min(1, { message: "Cannot be an empty string" }),
    ids: z
      .array(z.string(), { required_error: "Ids array is required" })
      .nonempty({ message: "Ids array must not be empty" }),
    isArchived: z.boolean(),
  }),
});
applications.patch(
  "/archive",
  zValidate(archiveApplicationsSchema),
  bulkArchiveApplications
);
// ---------------------------------------------
// EDIT APPLICATIONS
// ---------------------------------------------

// Define specific validation rules for each type of change
const EditTypes = z.enum([
  "allChange",
  "nextInterviewDateChange",
  "statusChange",
]);
const initialEditValidationSchema = z.object({
  body: z.object({
    type: EditTypes,
    userId: z.string().min(1, { message: "userId is required" }),
  }),
  params: z.object({
    applicationId: z.string(),
  }),
});

const allChangeSchema = z.object({
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

const statusChangeSchema = z.object({
  status: z.string({ required_error: "status is required" }).min(1, {
    message: "status must have at least one character",
  }),
  waitingFor: z.string().min(1).optional(),
  date: z.date().optional(),
});

const nextInterviewDateSchema = z.object({
  nextInterviewDate: z.date().nullish(),
});

// Enum for edit types
function conditional(
  fieldName: string,
  decider: (type: EditTypes) => any
) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Obtain the value of the specified field to decide which middleware to use
    const fieldValue = req.body[fieldName];
    // Determine the appropriate middleware based on the decision function
    const middleware = decider(fieldValue);

    if (!middleware) {
      return res
        .status(400)
        .json({ error: `Invalid value for ${fieldName}` });
    }

    // Execute the determined middleware
    return middleware(req, res, next);
  };
}

const decider = (type: EditTypes) => {
  if (type === "allChange") {
    console.log("allChange");
    return zValidate(allChangeSchema);
  } else if (type === "statusChange") {
    return zValidate(statusChangeSchema);
  } else if (type === "nextInterviewDateChange") {
    return zValidate(nextInterviewDateSchema);
  } else {
    return null; // Or handle invalid type appropriately
  }
};
applications.patch(
  "/edit/:applicationId",
  zValidate(initialEditValidationSchema),
  conditional("type", decider),
  editApplication
);
// ---------------------------------------------

// DELETE APPLICATIONS
// ---------------------------------------------

const deleteApplicationsSchema = z.object({
  body: z.object({
    userId: z
      .string({ required_error: "userId is required" })
      .min(1, { message: "Cannot be an empty string" }),
    ids: z
      .array(z.string(), { required_error: "Ids array is required" })
      .nonempty({ message: "Ids array must not be empty" }),
  }),
});
applications.delete(
  "/",
  zValidate(deleteApplicationsSchema),
  bulkDeleteApplications
);
// ---------------------------------------------

export default applications;
