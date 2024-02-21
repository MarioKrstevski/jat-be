import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../configs/prismadb";

export async function getDocuments(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Documents ");

  try {
    const documents = await prismadb.document.findMany({
      where: {
        userId: userId as string,
      },
    });
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createDocument(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { documentDetails } = req.body;
  console.log("Create Document  ");

  try {
    const document = await prismadb.document.create({
      data: {
        userId: userId as string,
        ...documentDetails,
      },
    });
    res.json(document);
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function editDocument(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { documentId } = req.params;
  const { documentDetails } = req.body;
  console.log("Edit Document  " + documentId);

  try {
    const document = await prismadb.document.update({
      where: {
        id: documentId as string,
      },
      data: {
        ...documentDetails,
      },
    });
    res.json(document);
  } catch (error) {
    console.error("Error editing document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteDocument(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { documentId } = req.params;
  console.log("Delete Document  " + documentId);

  try {
    const document = await prismadb.document.delete({
      where: {
        id: documentId as string,
      },
    });
    res.json(document);
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
