// src/server.ts
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/users";
import applicationsRoutes from "./routes/applications";
import {
  ClerkExpressRequireAuth,
  WithAuthProp,
  clerkClient,
} from "@clerk/clerk-sdk-node";
import express, { Application, Request, Response } from "express";
import { validateJWT } from "./middleware/validateClearJWT";

const app: Application = express();
const port = process.env.PORT || 5050;

const clerk = clerkClient.users.getCount().then((count) => {
  console.log(count);
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// app.get(
//   "/protected-route",
//   ClerkExpressRequireAuth({
//     // ...options
//   }),
//   (req: RequireAuthProp<Request>, res) => {
//     res.json(req.auth);
//   }
// );

app.use("/users", userRoutes);
app.use(
  "/applications",
  ClerkExpressRequireAuth({
    // ...options
  }),
  applicationsRoutes
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
