// src/server.ts
import {
  ClerkExpressRequireAuth,
  LooseAuthProp,
  WithAuthProp,
} from "@clerk/clerk-sdk-node";
import cors from "cors";
import "dotenv/config";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
} from "express";
import { ClerkLogUserId } from "./middleware/ClerkLogUserId.middleware";

import applicationsRoutes from "./routes/jobApplication.routes";
import tagsRoutes from "./routes/jobApplicationTag.routes";
import notesRoutes from "./routes/note.routes";
import companiesRoutes from "./routes/company.routes";
import contactsRoutes from "./routes/contact.routes";
import interviewsRoutes from "./routes/interview.routes";
import myResourcesRoutes from "./routes/myResource.routes";
import documentsRoutes from "./routes/document.routes";
import templatesRoutes from "./routes/template.routes";

// so that WithAuthProp<Request> works correctly
declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

const app: Application = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const authMiddleware =
  ClerkExpressRequireAuth({}) && ClerkLogUserId(); // Combine middleware
app.use("/api", authMiddleware);

app.use("/api/tags", tagsRoutes);
app.use("/api/interviews", interviewsRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/myResources", myResourcesRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/templates", templatesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
