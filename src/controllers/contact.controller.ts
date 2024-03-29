import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../configs/prismadb";

export async function getContacts(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Contacts ");

  try {
    const contacts = await prismadb.contact.findMany({
      where: {
        userId: userId as string,
      },
      include: {
        company: {
          include: {
            contacts: true,
          },
        },
        note: true,
      },
    });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createContact(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Create Contact");
  const { contactData } = req.body;

  try {
    // Create a note
    const note = await prismadb.note.create({
      data: {
        userId,
      },
    });

    // Create a contact and reference the note
    const contact = await prismadb.contact.create({
      data: {
        ...contactData,
        userId,
        companyId: contactData.companyId,
        note: {
          connect: {
            id: note.id,
          },
        },
      },
    });

    res.json({ contact, note });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function editContact(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Updating Contact");
  const { contactData } = req.body;
  const { contactId } = req.params;

  try {
    const contact = await prismadb.contact.update({
      where: {
        id: contactId,
      },
      data: {
        ...contactData,
        userId,
        companyId: contactData.companyId,
      },
    });

    res.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteContact(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Create Contact");
  const { contactId } = req.params;

  try {
    const contact = await prismadb.contact.delete({
      where: {
        id: contactId as string,
      },
    });

    res.json(contact);
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
