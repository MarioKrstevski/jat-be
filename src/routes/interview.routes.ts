import { Router } from "express";
import {
  createInterview,
  getInterviews,
} from "../controllers/interview.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import { createInterviewSchema } from "../schemas/interview.schema";

const interviews = Router();

interviews.get("/", getInterviews);
interviews.post(
  "/",
  zValidate(createInterviewSchema),
  createInterview
);

export default interviews;
