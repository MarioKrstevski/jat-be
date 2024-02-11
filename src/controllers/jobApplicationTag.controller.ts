import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

import prismadb from "../prismadb";

export async function createTag(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { color, name } = req.body;
  console.log("Create tag ");

  try {
    const tag = await prismadb.jobApplicationTag.create({
      data: {
        color: color.toUpperCase(),
        name: name.toLowerCase(),
        userId,
      },
    });
    res.json(tag);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTags(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Tags ");

  try {
    const tags = await prismadb.jobApplicationTag.findMany({
      where: {
        userId: userId as string,
      },
    });
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function editTag(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { newColor, newName, originalName } = req.body;
  const { tagId } = req.params;
  console.log("Edit Tag " + tagId);

  // update tag in tags table
  try {
    const tag = await prismadb.jobApplicationTag.update({
      where: {
        id: tagId,
        userId: userId as string,
      },
      data: {
        color: newColor.toUpperCase(),
        name: newName.toLowerCase(),
      },
    });

    // update tags in existing applications
    // the name has changed (it is not just color change)
    if (tag.name !== originalName) {
      try {
        const applications = await prismadb.jobApplication.findMany({
          where: {
            userId: userId as string,
            tags: {
              contains: originalName,
            },
          },
        });

        applications.forEach(async (application) => {
          const newTags = application.tags
            .split(",")
            .map((t) => {
              if (t === originalName) {
                return newName;
              } else {
                return t;
              }
            })
            .join(",");

          await prismadb.jobApplication.update({
            where: {
              id: application.id,
            },
            data: {
              tags: {
                set: newTags,
              },
            },
          });
        });
      } catch (error) {
        console.error(
          "Error updating new tag name for existing applications",
          error
        );
        res.status(500).json({ error: "Internal Server Error" });
      }
    }

    res.json(tag);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteTag(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { tagId } = req.params;
  console.log("Delete Tag " + tagId);

  try {
    const tag = await prismadb.jobApplicationTag.delete({
      where: {
        userId: userId as string,
        id: tagId as string,
      },
    });

    if (tag.name) {
      try {
        const applications = await prismadb.jobApplication.findMany({
          where: {
            userId: userId as string,
            tags: {
              contains: tag.name as string,
            },
          },
        });

        applications.forEach(async (application) => {
          const newTags = application.tags
            .split(",")
            .filter((t) => {
              return t !== tag.name;
            })
            .join(",");

          await prismadb.jobApplication.update({
            where: {
              id: application.id,
            },
            data: {
              tags: {
                set: newTags,
              },
            },
          });
        });
      } catch (error) {
        console.error(
          "Error deleting tag for existing applications",
          error
        );
        res.status(500).json({ error: "Internal Server Error" });
      }
    }

    res.json(tag);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
