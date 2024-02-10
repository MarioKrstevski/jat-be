import { Router } from "express";
import {
  getCompanies,
  getCompany,
  getSavedCompanies,
  requestCompany,
  saveExistingCompany,
  saveCustomCompany,
  deleteCustomCompany,
  editCustomCompany,
} from "../controllers/company.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  deleteCustomCompanySchema,
  editCustomCompanySchema,
  getCompanySchema,
  saveCustomCompanySchema,
  saveExistingCompanySchema,
} from "../schemas/company.schema";

const companies = Router();

companies.get("/", getCompanies);

companies.get("/saved", getSavedCompanies);
companies.get("/:companyId", zValidate(getCompanySchema), getCompany);

companies.post(
  "/save/existing",
  zValidate(saveExistingCompanySchema),
  saveExistingCompany
);
companies.post(
  "/save/custom",
  zValidate(saveCustomCompanySchema),
  saveCustomCompany
);

companies.patch(
  "/edit/custom",
  zValidate(editCustomCompanySchema),
  editCustomCompany
);

companies.delete(
  "/custom",
  zValidate(deleteCustomCompanySchema),
  deleteCustomCompany
);

companies.post("/request", requestCompany);

export default companies;
