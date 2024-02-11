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
import { consoleLogRequest } from "../middleware/consoleLogRequest.middleware";

const contacts = Router();

contacts.get("/", getContacts);
contacts.post("/", zValidate(createContactSchema), createContact);
contacts.patch(
  "/:contactId",
  zValidate(editContactSchema),
  editContact
);
contacts.delete(
  "/:contactId",
  zValidate(deleteContactSchema),
  deleteContact
);

export default contacts;
