import { NextFunction, Response, Request } from "express";
import { AnyZodObject, ZodError } from "zod";

export function zValidate(schema: AnyZodObject) {
  return function (req: any, res: any, next: NextFunction) {
    if (req) {
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
    } else {
      console.log("req is null");
    }
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
