import { NextFunction, Request, Response } from "express";
import prismadb from "../prismadb";
import { EditTypes } from "../types";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

// Function to handle POST /applications

export async function createApplication(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  // Add your implementation here

  const userId = req.auth.userId!;
  const { application } = req.body;

  console.log("Create Application " + userId);

  try {
    const newApplication = await prismadb.jobApplication.create({
      data: {
        ...application,
        userId,
      },
    });

    // console.log("newApplication", newApplication);

    res.json(newApplication);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle GET /applications
export async function getApplications(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Applications ");

  try {
    const jobApplications = await prismadb.jobApplication.findMany({
      where: {
        userId: userId as string,
      },
    });
    res.json(jobApplications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle GET /applications/:id
export async function getApplication(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  // Add your implementation here

  const userId = req.auth.userId!;

  const { applicationId } = req.params;

  console.log("Get Application with ID " + applicationId);

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
}

// Function to handle PATCH /applications/:id
export async function editApplication(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;

  const { applicationId } = req.params;
  const {
    application,
    type,
  }: {
    application: any;
    applicationId: string;
    userId: string;
    type: EditTypes;
  } = req.body;

  console.log("Edit Application (" + type + ") ID " + applicationId);

  try {
    const edittedApplication = await prismadb.jobApplication.update({
      where: {
        id: applicationId,
        userId: userId,
      },
      data: {
        ...application,
      },
    });

    // console.log("edittedApplication", edittedApplication);

    res.json(edittedApplication);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle PATCH /applications/archive
export async function bulkArchiveApplications(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  console.log("Bulk Archive Applications");

  const userId = req.auth.userId!;
  const { ids, isArchived } = req.body;

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

    res.json(archivedApplications);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to handle DELETE /applications
export async function bulkDeleteApplications(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;

  console.log("Bulk Delete Applications");
  const { ids } = req.body;

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

    // console.log("deletedApplications", deletedApplications);

    res.json(deletedApplications);
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
