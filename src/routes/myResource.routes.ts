import { Router } from "express";
import {
  createMyResource,
  deleteMyResource,
  editMyResource,
  getMyResources,
} from "../controllers/myResource.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createMyResourceSchema,
  deleteMyResourceSchema,
  editMyResourceSchema,
} from "../schemas/myResource.schema";

const myResources = Router();

myResources.get("/", getMyResources);

myResources.post(
  "/",
  zValidate(createMyResourceSchema),
  createMyResource
);

myResources.patch(
  "/:myResourceId",
  zValidate(editMyResourceSchema),
  editMyResource
);

myResources.delete(
  "/:myResourceId",
  zValidate(deleteMyResourceSchema),
  deleteMyResource
);

export default myResources;
