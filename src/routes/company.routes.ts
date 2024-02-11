import { Router } from "express";
import {
  getCompanies,
  getCompany,
  getSavedCompanies,
  requestCompany,
  saveExistingCompany,
  saveCustomCompany,
  deleteSavedCompany,
  updateSavedCustomCompany,
} from "../controllers/company.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  deleteCustomCompanySchema,
  getCompanySchema,
  saveCustomCompanySchema,
  saveExistingCompanySchema,
  updateSavedCustomCompanySchema,
} from "../schemas/company.schema";

const companies = Router();

companies.get("/saved", getSavedCompanies);
companies.get("/:companyId", zValidate(getCompanySchema), getCompany);
companies.get("/", getCompanies);

companies.post(
  "/existing/save/:companyId",
  zValidate(saveExistingCompanySchema),
  saveExistingCompany
);
companies.post(
  "/custom",
  zValidate(saveCustomCompanySchema),
  saveCustomCompany
);

companies.patch(
  "/saved/custom/:savedCompanyId",
  zValidate(updateSavedCustomCompanySchema),
  updateSavedCustomCompany
);

companies.delete(
  "/saved/:savedCompanyId",
  zValidate(deleteCustomCompanySchema),
  deleteSavedCompany
);

companies.post("/request", requestCompany);

export default companies;
