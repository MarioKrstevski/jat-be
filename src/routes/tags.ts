import { Router } from "express";
import { getTags } from "../controllers/tags.controller";
const tags = Router();

tags.get("/", getTags);

export default tags;
