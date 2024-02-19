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

app.use(
  "/api/tags",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  tagsRoutes
);

app.use(
  "/api/interviews",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  interviewsRoutes
);
app.use(
  "/api/contacts",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  contactsRoutes
);

app.use(
  "/api/companies",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  companiesRoutes
);

app.use(
  "/api/notes",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  notesRoutes
);

app.use(
  "/api/applications",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  applicationsRoutes
);

app.use(
  "/api/myResources",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  myResourcesRoutes
);

app.use(
  "/api/documents",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  documentsRoutes
);

app.use(
  "/api/templates",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  templatesRoutes
);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
