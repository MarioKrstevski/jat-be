import { Router } from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contact.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import { createContactSchema } from "../schemas/contact.schema";

const contacts = Router();

contacts.get("/", getContacts);
contacts.post("/", zValidate(createContactSchema), createContact);

export default contacts;
