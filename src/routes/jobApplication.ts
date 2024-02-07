// src/routes/users.ts
import { Router } from "express";
import {
  bulkArchiveApplications,
  bulkDeleteApplications,
  createApplication,
  editApplication,
  getApplication,
  getApplications,
} from "../controllers/jobApplication.controller";
import {
  zConditionalValidate,
  zValidate,
} from "../middleware/validateZod.middleware";

import {
  archiveApplicationsSchema,
  createApplicationSchema,
  deleteApplicationsSchema,
  editSchemaDecider,
  getApplicationSchema,
  // getApplicationsSchema,
  initialEditValidationSchema,
} from "../schemas/jobApplication.schema";

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

applications.post(
  "/",
  zValidate(createApplicationSchema),
  createApplication
);
// ---------------------------------------------

// GET APPLICATIONS
// ---------------------------------------------

applications.get(
  "/",
  // zValidate(getApplicationsSchema),
  getApplications
);
// ---------------------------------------------

// GET APPLICATION
// ---------------------------------------------

applications.get(
  "/:id",
  zValidate(getApplicationSchema),
  getApplication
);
// ---------------------------------------------

// ARCHIVE APPLICATIONS
// ---------------------------------------------

applications.patch(
  "/archive",
  zValidate(archiveApplicationsSchema),
  bulkArchiveApplications
);
// ---------------------------------------------
// EDIT APPLICATIONS
// ---------------------------------------------

// Define specific validation rules for each type of change

// Enum for edit types

applications.patch(
  "/edit/:applicationId",
  zValidate(initialEditValidationSchema),
  zConditionalValidate("type", editSchemaDecider),
  editApplication
);
// ---------------------------------------------

// DELETE APPLICATIONS
// ---------------------------------------------

applications.delete(
  "/",
  zValidate(deleteApplicationsSchema),
  bulkDeleteApplications
);
// ---------------------------------------------

export default applications;
