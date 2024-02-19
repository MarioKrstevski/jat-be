import { Router } from "express";
import {
  createInterview,
  deleteInterview,
  editInterview,
  getInterviews,
} from "../controllers/interview.controller";
import { zValidate } from "../middleware/validateZod.middleware";
import {
  createInterviewSchema,
  deleteInterviewSchema,
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

interviews.delete(
  "/:interviewId",
  zValidate(deleteInterviewSchema),
  deleteInterview
);

export default interviews;
