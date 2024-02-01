// src/server.ts

import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import applicationsRoutes from "./routes/applications";
const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/users", userRoutes);
app.use("/applications", applicationsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
