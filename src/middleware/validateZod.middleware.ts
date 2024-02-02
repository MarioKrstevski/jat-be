import { NextFunction, Response, Request } from "express";
import { AnyZodObject, ZodError } from "zod";
import { EditTypes } from "../types";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

export function zValidate(schema: AnyZodObject) {
  return function (
    req: WithAuthProp<Request>,
    res: Response,
    next: NextFunction
  ) {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        return res.status(400).json({ errors: e.errors });
      }
      // Optionally handle other types of errors
      console.error(e);
      return res
        .status(500)
        .json({ error: "An unexpected error occurred" });
    }
  };
}

export function zConditionalValidate(
  fieldName: string,
  decider: (type: EditTypes) => any
) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Obtain the value of the specified field to decide which middleware to use
    const fieldValue = req.body[fieldName];
    // Determine the appropriate middleware based on the decision function
    const schema = decider(fieldValue);

    if (!schema) {
      return res
        .status(400)
        .json({ error: `Invalid value for ${fieldName}` });
    }

    // Execute the determined middleware
    return zValidate(schema)(req, res, next);
  };
}
