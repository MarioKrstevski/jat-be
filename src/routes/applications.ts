// src/routes/users.ts
import { Router } from "express";
import {
  bulkArchiveApplications,
  bulkDeleteApplications,
  createApplication,
  editApplication,
  getApplication,
} from "../controllers/applicationsController";
import { z } from "zod";
import { zValidate } from "../middleware/validateZodMiddleware";

const applications = Router();

// POST /applications
// GET /applications/:id
// PATCH /applications/:id
// DELETE /applications/:id
// PATCH /applications/:id/archive
// DELETE /applications
// PATCH /applications/archive

applications.get("/:id", getApplication);

applications.post("/", createApplication);

// ARCHIVE APPLICATIONS
// ---------------------------------------------
const archiveApplicationsSchema = z.object({
  body: z.object({
    userId: z.string().min(1, { message: "userId is required" }),
    ids: z
      .array(z.string())
      .nonempty({ message: "Ids array must not be empty" }),
  }),
});

applications.patch(
  "/archive",
  zValidate(archiveApplicationsSchema),
  bulkArchiveApplications
);
// ---------------------------------------------

applications.patch("/:id", editApplication);

applications.delete("/", bulkDeleteApplications);

export default applications;
