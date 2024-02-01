// src/server.ts

import express from "express";
import prismadb from "./prismadb";
import cors from "cors";
import { JobApplication as JobApplicationType } from "@prisma/client";
import { EditTypes } from "./types";
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
app.patch("/applications2/archive", async (req, res) => {
  const { ids, isArchived, userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
  }

  if (!ids) {
    res.status(400).json({ error: "Id is missing" });
  }

  if (
    !Array.isArray(ids) &&
    ids.any((id: string) => typeof id !== "string")
  ) {
    res
      .status(400)
      .json({ error: "Ids must be an array of strings" });
  }

  if (ids.length === 0) {
    res.status(400).json({ error: "Ids array must not be empty" });
  }

  if (ids.length === 1) {
    console.log("We are archiving one job application");
  } else if (ids.length > 1) {
    console.log(
      "We are archiving multiple job applications - " + ids.length
    );
  }

  try {
    const archivedApplications =
      await prismadb.jobApplication.updateMany({
        where: {
          id: {
            in: ids,
          },
          userId: userId,
        },
        data: {
          isArchived: isArchived,
        },
      });

    console.log("archivedApplications", archivedApplications);

    res.json(archivedApplications);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.patch("/archiveJobApplication", async (req, res) => {
  const { ids, isArchived, userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
  }

  if (!ids) {
    res.status(400).json({ error: "Id is missing" });
  }

  if (
    !Array.isArray(ids) &&
    ids.any((id: string) => typeof id !== "string")
  ) {
    res
      .status(400)
      .json({ error: "Ids must be an array of strings" });
  }

  if (ids.length === 0) {
    res.status(400).json({ error: "Ids array must not be empty" });
  }

  if (ids.length === 1) {
    console.log("We are archiving one job application");
  } else if (ids.length > 1) {
    console.log(
      "We are archiving multiple job applications - " + ids.length
    );
  }

  try {
    const archivedApplications =
      await prismadb.jobApplication.updateMany({
        where: {
          id: {
            in: ids,
          },
          userId: userId,
        },
        data: {
          isArchived: isArchived,
        },
      });

    console.log("archivedApplications", archivedApplications);

    res.json(archivedApplications);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/deleteJobApplication", async (req, res) => {
  const { ids, userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
  }

  if (!ids) {
    res.status(400).json({ error: "Id is missing" });
  }

  if (
    !Array.isArray(ids) &&
    ids.any((id: string) => typeof id !== "string")
  ) {
    res
      .status(400)
      .json({ error: "Ids must be an array of strings" });
  }

  if (ids.length === 0) {
    res.status(400).json({ error: "Ids array must not be empty" });
  }

  if (ids.length === 1) {
    console.log("We are deleting one job application");
  } else if (ids.length > 1) {
    console.log(
      "We are deleting multiple job applications - " + ids.length
    );
  }

  try {
    const deletedApplications =
      await prismadb.jobApplication.deleteMany({
        where: {
          id: {
            in: ids,
          },
          userId: userId,
        },
      });

    console.log("deletedApplications", deletedApplications);

    res.json(deletedApplications);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/editJobApplication", async (req, res) => {
  const {
    jobApplication,
    userId,
    type,
  }: {
    jobApplication: any;
    userId: string;
    type: EditTypes;
  } = req.body;

  const changeType = type;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
  }
  if (!jobApplication) {
    res
      .status(400)
      .json({ error: "Job application object is missing" });
  }
  if (changeType === "allChange") {
    if (!jobApplication.status) {
      res.status(400).json({ error: "Starting status is required" });
    }

    if (!jobApplication.jobTitle) {
      res.status(400).json({ error: "A job title is required" });
    }

    if (!jobApplication.companyName) {
      res.status(400).json({ error: "Company name is required" });
    }
  }

  if (changeType === "nextInterviewDateChange") {
    // doesnt make sence to check since nextInterviewDate can be null maybe we ant to remove this thing
  }

  if (changeType === "statusChange") {
    if (!jobApplication.status) {
      res.status(400).json({ error: "Starting status is required" });
    }
  }

  console.log("jobApplication", jobApplication);
  // console.log("reqbody", req.body);
  // console.log("userId", userId);

  // res.status(200).json({ message: "success" });
  // return;

  try {
    const edittedApplication = await prismadb.jobApplication.update({
      where: {
        id: jobApplication.id,
        userId: userId,
      },
      data: {
        ...jobApplication,
      },
    });

    console.log("edittedApplication", edittedApplication);

    res.json(edittedApplication);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/createJobApplication", async (req, res) => {
  const { jobApplication, userId } = req.body;

  console.log("jobApplication", jobApplication);
  // console.log("reqbody", req.body);
  console.log("userId", userId);

  // res.status(200).json({ message: "success" });
  // return;
  if (!userId) {
    res.status(400).json({ error: "userId is required" });
  }

  if (!jobApplication) {
    res
      .status(400)
      .json({ error: "Job application object is missing" });
  }

  if (!jobApplication.status) {
    res.status(400).json({ error: "Starting status is required" });
  }

  if (!jobApplication.jobTitle) {
    res.status(400).json({ error: "A job title is required" });
  }

  if (!jobApplication.companyName) {
    res.status(400).json({ error: "Company name is required" });
  }

  try {
    const newApplication = await prismadb.jobApplication.create({
      data: {
        ...jobApplication,
        userId,
      },
    });

    console.log("newApplication", newApplication);

    res.json(newApplication);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
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
