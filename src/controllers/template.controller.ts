import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../prismadb";

export async function getTemplates(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Templates ");

  try {
    const templates = await prismadb.template.findMany({
      where: {
        userId: userId as string,
      },
    });
    res.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTemplate(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { templateInfo } = req.body;
  console.log("Create Template  ");

  try {
    const template = await prismadb.template.create({
      data: {
        userId: userId as string,
        ...templateInfo,
      },
    });
    res.json(template);
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function editTemplate(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { templateId } = req.params;
  const { templateInfo } = req.body;
  console.log("Edit Template  " + templateId);

  try {
    const template = await prismadb.template.update({
      where: {
        id: templateId as string,
      },
      data: {
        ...templateInfo,
      },
    });
    res.json(template);
  } catch (error) {
    console.error("Error editing template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteTemplate(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { templateId } = req.params;
  console.log("Delete Template  " + templateId);

  try {
    const template = await prismadb.template.delete({
      where: {
        id: templateId as string,
      },
    });
    res.json(template);
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
