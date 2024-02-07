import { Router } from "express";
import {
  getCompanies,
  getCompany,
  getSavedCompanies,
  saveCompany,
  requestCompany,
} from "../controllers/company.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import { getCompanySchema } from "../schemas/company.schema";

const companies = Router();

companies.get("/", getCompanies);

companies.get("/:companyId", zValidate(getCompanySchema), getCompany);

companies.get("/saved", getSavedCompanies);

companies.post("/save", saveCompany);

companies.post("/request", requestCompany);

export default companies;
