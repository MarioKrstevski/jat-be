import { Router } from "express";
import {
  createContact,
  deleteContact,
  editContact,
  getContacts,
} from "../controllers/contact.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createContactSchema,
  deleteContactSchema,
  editContactSchema,
} from "../schemas/contact.schema";

const contacts = Router();

contacts.get("/", getContacts);
contacts.post("/", zValidate(createContactSchema), createContact);
contacts.patch("/", zValidate(editContactSchema), editContact);
contacts.delete("/", zValidate(deleteContactSchema), deleteContact);

export default contacts;
