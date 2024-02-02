import { NextFunction, Response, Request } from "express";
import { AnyZodObject, ZodError } from "zod";

export function zValidate(schema: AnyZodObject) {
  return function (req: any, res: any, next: NextFunction) {
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
