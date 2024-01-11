// src/server.ts

import express from "express";
import prismadb from "./prismadb";

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());

app.get("/jobApplications", async (req, res) => {
  try {
    const jobApplications = await prismadb.jobApplication.findMany();
    res.json(jobApplications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint to create a new job application
app.post("/jobApplications", async (req, res) => {
  const { name } = req.body;

  try {
    const newJobApplication = await prismadb.jobApplication.create({
      data: {
        name,
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
