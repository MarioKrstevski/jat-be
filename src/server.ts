// src/server.ts

import express from "express";
import prismadb from "./prismadb";
import cors from "cors";
import { JobApplication as JobApplicationType } from "@prisma/client";
const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/jobApplications", async (req, res) => {
  const { userId } = req.body;

  try {
    const jobApplications = await prismadb.jobApplication.findMany({
      where: {
        userId: userId,
      },
    });
    res.json(jobApplications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/createJobApplications", async (req, res) => {
  const { jobApplications, userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
  }

  try {
    const newApplications = await prismadb.jobApplication.createMany({
      data: jobApplications.map((ja: JobApplicationType) => ({
        ...ja,
        userId,
      })),
    });

    res.json(newApplications);
  } catch (error) {
    console.error("Error creating job applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint to create a new job application
app.post("/jobApplications", async (req, res) => {
  const { name } = req.body;

  try {
    const newJobApplication = await prismadb.jobApplication.create({
      data: {
        ...req.body,
      },
    });

    res.json(newJobApplication);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
