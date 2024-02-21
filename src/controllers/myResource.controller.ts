import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../configs/prismadb";

export async function getMyResources(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get MyResources ");

  try {
    const myResources = await prismadb.myResource.findMany({
      where: {
        userId: userId as string,
      },
    });
    res.json(myResources);
  } catch (error) {
    console.error("Error fetching myResources:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createMyResource(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { myResourceDetails } = req.body;
  console.log("Create MyResource  ");

  try {
    const myResource = await prismadb.myResource.create({
      data: {
        userId: userId as string,
        ...myResourceDetails,
      },
    });
    res.json(myResource);
  } catch (error) {
    console.error("Error deleting myResource:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function editMyResource(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { myResourceId } = req.params;
  const { myResourceDetails } = req.body;
  console.log("Edit MyResource  " + myResourceId);

  try {
    const myResource = await prismadb.myResource.update({
      where: {
        id: myResourceId as string,
      },
      data: {
        ...myResourceDetails,
      },
    });
    res.json(myResource);
  } catch (error) {
    console.error("Error editing myResource:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteMyResource(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { myResourceId } = req.params;
  console.log("Delete MyResource  " + myResourceId);

  try {
    const myResource = await prismadb.myResource.delete({
      where: {
        id: myResourceId as string,
      },
    });
    res.json(myResource);
  } catch (error) {
    console.error("Error deleting myResource:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
