import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../configs/prismadb";

export async function editNote(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { newContent } = req.body;
  const { noteId } = req.params;
  console.log("Edit Note " + noteId);

  // update tag in tags table
  try {
    const note = await prismadb.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        content: newContent,
      },
    });
    res.json(note);
  } catch (error) {
    console.error("Error editing note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
