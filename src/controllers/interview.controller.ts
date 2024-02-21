import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../configs/prismadb";

export async function getInterviews(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Interviews ");

  try {
    const interviews = await prismadb.interview.findMany({
      where: {
        userId: userId as string,
      },
      include: {
        note: true,
        jobApplication: {
          include: {
            company: true,
          },
        },
      },
    });
    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createInterview(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { interviewDetails } = req.body;
  console.log("Create Interview ");

  // update tag in tags table
  try {
    const note = await prismadb.note.create({
      data: {
        userId: userId,
      },
    });

    const interview = await prismadb.interview.create({
      data: {
        type: interviewDetails.type,
        format: interviewDetails.format,
        date: interviewDetails.date,
        userId: userId,
        title: interviewDetails.title,
        location: interviewDetails.location,
        duration: interviewDetails.duration,
        note: {
          connect: {
            id: note.id,
          },
        },
        // jobApplication: {
        //   connect: {
        //     id: interviewDetails.jobApplicationId
        //       ? interviewDetails.jobApplicationId
        //       : undefined,
        //   },
        // },
        // contacts: {
        //   connect: interviewDetails.contactsIds.map((id: string) => ({
        //     id,
        //   })),
        // },
      },
      include: {
        note: true,
        jobApplication: true,
      },
    });

    res.json(interview);
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function editInterview(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { interviewDetails } = req.body;
  const { interviewId } = req.params;
  console.log("Edit Interview ");

  // update tag in tags table
  try {
    const interview = await prismadb.interview.update({
      where: {
        id: interviewId,
      },
      data: {
        type: interviewDetails.type,
        format: interviewDetails.format,
        date: interviewDetails.date,
        userId: userId,
        title: interviewDetails.title,
        location: interviewDetails.location,
        duration: interviewDetails.duration,
      },
      include: {
        note: true,
        jobApplication: true,
      },
    });

    res.json(interview);
  } catch (error) {
    console.error("Error edit interview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteInterview(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { interviewId } = req.params;
  console.log("Delete Interview ");

  // update tag in tags table
  try {
    const interview = await prismadb.interview.delete({
      where: {
        id: interviewId,
      },
    });

    res.json(interview);
  } catch (error) {
    console.error("Error deleting interview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
