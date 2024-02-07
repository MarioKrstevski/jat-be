import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../prismadb";

export async function getCompanies(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Companies ");

  try {
    const companies = await prismadb.company.findMany();
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Companies ");
  const { companyId } = req.query;

  try {
    const company = await prismadb.company.findFirst({
      where: {
        id: companyId as string,
      },
    });
    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getSavedCompanies(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Get Saved Companies ");

  try {
    const company = await prismadb.savedCompany.findMany({
      where: {
        userId,
      },
      include: {
        company: true,
      },
    });
    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function saveCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  console.log("Save Company");

  try {
    const company = await prismadb.savedCompany.findMany({
      where: {
        userId,
      },
      include: {
        company: true,
      },
    });
    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function requestCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { name, linkedinUrl } = req.body;
  console.log("Request Company ");

  try {
    // Check if the linkedinUrl already exists in the company table
    const existingCompany = await prismadb.company.findFirst({
      where: {
        linkedin: linkedinUrl,
      },
    });

    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company already exists" });
    }

    // Check if the linkedinUrl already exists in the requestedCompany table
    const existingRequestedCompany =
      await prismadb.requestedCompany.findFirst({
        where: {
          linkedin: linkedinUrl,
        },
      });

    if (existingRequestedCompany) {
      return res.status(400).json({
        error: "Company already requested, check your linkedin url",
      });
    }

    const requestedCompany = await prismadb.requestedCompany.create({
      data: {
        userId,
        name,
        linkedin: linkedinUrl,
      },
    });
    res.json(requestedCompany);
  } catch (error) {
    console.error("Error requesting company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
