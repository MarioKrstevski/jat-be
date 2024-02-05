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
    const tag = await prismadb.jobApplicationTags.create({
      data: {
        color,
        name,
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
    const tags = await prismadb.jobApplicationTags.findMany({
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
  const { color, name, tagId } = req.body;
  console.log("Edit Tag " + tagId);

  try {
    const tag = await prismadb.jobApplicationTags.update({
      where: {
        id: tagId,
        userId: userId as string,
      },
      data: {
        color,
        name,
      },
    });
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
  const { tagId } = req.query;
  console.log("Delete Tag " + tagId);

  try {
    const tag = await prismadb.jobApplicationTags.delete({
      where: {
        userId: userId as string,
        id: tagId as string,
      },
    });
    res.json(tag);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
