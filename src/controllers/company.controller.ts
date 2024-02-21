import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import prismadb from "../configs/prismadb";

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
  console.log("Get Company ");
  const { companyId } = req.params;

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
        note: true,
        contacts: true,
      },
    });
    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function saveExistingCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { companyId } = req.params;
  console.log("Save Existing Company");

  try {
    const existingCompany = await prismadb.savedCompany.findFirst({
      where: {
        companyId,
      },
    });

    if (existingCompany) {
      res.status(400).json({ error: "Company already exists" });
    } else {
      const note = await prismadb.note.create({
        data: {
          userId,
        },
      });

      const company = await prismadb.savedCompany.create({
        data: {
          companyId,
          userId,
          noteId: note.id,
        },
      });
      res.json({ company, note });
    }
  } catch (error) {
    console.error("Error saving existing company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function saveCustomCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { link, name } = req.body;
  console.log("Save Custom Company");

  try {
    if (link) {
      const existingCompany = await prismadb.savedCompany.findFirst({
        where: {
          OR: [{ link }, { company: { linkedin: link } }],
        },
      });

      if (existingCompany) {
        return res.status(400).json({
          error: "Company with the same link already exists",
        });
      }
    } else {
      const existingCompany = await prismadb.savedCompany.findFirst({
        where: {
          name,
        },
      });

      if (existingCompany) {
        return res.status(400).json({
          error: "Company with the same name already exists",
        });
      }
    }

    const note = await prismadb.note.create({
      data: {
        userId,
      },
    });

    const company = await prismadb.savedCompany.create({
      data: {
        userId,
        name,
        link,
        noteId: note.id,
      },
    });
    res.json({ company, note });
  } catch (error) {
    console.error("Error saving custom company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateSavedCustomCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { link, name } = req.body;
  const { savedCompanyId } = req.params;
  console.log("Edit Custom Company " + savedCompanyId);

  try {
    const editingCompany = await prismadb.savedCompany.findFirst({
      where: {
        id: savedCompanyId,
      },
    });

    if (link && editingCompany?.link !== link) {
      const existingCompany = await prismadb.savedCompany.findFirst({
        where: {
          OR: [{ link }, { company: { linkedin: link } }],
        },
      });

      if (existingCompany) {
        return res.status(400).json({
          error: "Company with the same link already exists",
        });
      }
    }
    if (name && editingCompany?.name !== name) {
      const existingCompany = await prismadb.savedCompany.findFirst({
        where: {
          name,
        },
      });

      if (existingCompany) {
        return res.status(400).json({
          error: "Company with the same name already exists",
        });
      }
    }

    const company = await prismadb.savedCompany.update({
      where: {
        id: savedCompanyId,
      },
      data: {
        name,
        link,
      },
    });
    res.json(company);
  } catch (error) {
    console.error("Error editing custom company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function requestCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { name, link } = req.body;
  console.log("Request Company ");

  try {
    // Check if the linkedinUrl already exists in the company table
    const existingCompany = await prismadb.company.findFirst({
      where: {
        linkedin: link,
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
          link,
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
        link,
      },
    });
    res.json(requestedCompany);
  } catch (error) {
    console.error("Error requesting company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteSavedCompany(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  const userId = req.auth.userId!;
  const { savedCompanyId } = req.params;
  console.log("Delete Custom Company " + savedCompanyId);

  try {
    const company = await prismadb.savedCompany.delete({
      where: {
        id: savedCompanyId,
      },
    });
    res.json(company);
  } catch (error) {
    console.error("Error deleting custom company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
