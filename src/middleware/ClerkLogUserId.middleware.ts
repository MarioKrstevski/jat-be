import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

export function ClerkLogUserId() {
  return (
    req: WithAuthProp<Request>,
    res: Response,
    next: NextFunction
  ) => {
    console.log("     ");
    console.log("     ");
    console.log("User ID: ", req.auth.userId);

    next();
  };
}
