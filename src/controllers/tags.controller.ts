import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

import prismadb from "../prismadb";

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
