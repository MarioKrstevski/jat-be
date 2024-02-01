import { NextFunction, Request, Response } from "express";
import prismadb from "../prismadb";

export function createApplication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Add your implementation here
}

// Function to handle GET /applications/:id
export function getApplication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Add your implementation here
}

// Function to handle PATCH /applications/:id
export function editApplication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send("editApplication");
  // Add your implementation here
}

// Function to handle PATCH /applications/:id/archive
export async function bulkArchiveApplications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Bulk Archive Applications");
  console.log("req.body", req.body);

  const { ids, isArchived, userId } = req.body;

  // if (!userId) {
  //   res.status(400).json({ error: "userId is required" });
  // }

  // if (!ids) {
  //   res.status(400).json({ error: "Id is missing" });
  // }

  // if (
  //   !Array.isArray(ids) &&
  //   ids.some((id: string) => typeof id !== "string")
  // ) {
  //   res
  //     .status(400)
  //     .json({ error: "Ids must be an array of strings" });
  // }

  // if (ids.length === 0) {
  //   res.status(400).json({ error: "Ids array must not be empty" });
  // }

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
export function bulkDeleteApplications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Add your implementation here
}

// Function to handle PATCH /applications/archive
