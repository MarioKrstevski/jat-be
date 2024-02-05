import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

export function consoleLogRequest() {
  return (
    req: WithAuthProp<Request>,
    res: Response,
    next: NextFunction
  ) => {
    console.log("--     ");
    console.log("Req ", req);
    console.log("--     ");
    next();
  };
}
