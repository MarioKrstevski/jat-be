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
import applicationsRoutes from "./routes/applications";
import userRoutes from "./routes/users";
import { ClerkLogUserId } from "./middleware/ClerkLogUserId.middleware";

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

app.use("/api/users", userRoutes);
app.use(
  "/api/applications",
  ClerkExpressRequireAuth({
    // ...options
  }),
  ClerkLogUserId(),
  applicationsRoutes
);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
