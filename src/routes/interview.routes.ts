import { Router } from "express";
import {
  createInterview,
  editInterview,
  getInterviews,
} from "../controllers/interview.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createInterviewSchema,
  editInterviewSchema,
} from "../schemas/interview.schema";

const interviews = Router();

interviews.get("/", getInterviews);

interviews.post(
  "/",
  zValidate(createInterviewSchema),
  createInterview
);

interviews.patch(
  "/:interviewId",
  zValidate(editInterviewSchema),
  editInterview
);

export default interviews;
