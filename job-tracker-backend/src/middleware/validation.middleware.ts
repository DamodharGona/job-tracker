import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { AppErrors } from "../errors/app.errors.js";

export const validateRequest = (schema: ZodSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log(req.body);
      console.log(req.query);
      console.log(req.params);
      const parsed = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      console.log(parsed);

      if (!parsed.success) {
        const errorMessages = parsed.error.issues
          .map((err) => {
            return `${err.path.join(".")}: ${err.message}`;
          })
          .join(", ");
        throw AppErrors.badRequest(errorMessages);
      }

      const data = parsed.data as {
        body?: unknown;
        query?: Record<string, unknown>;
        params?: Record<string, string>;
      };

      if (data.body !== undefined) {
        req.body = data.body;
      }

      if (data.params !== undefined) {
        req.params = data.params;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateResponse = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Save the original res.json function
    const originalJson = res.json;

    // Override res.json
    res.json = function (body: any): Response {
      const result = schema.safeParse(body);

      if (!result.success) {
        // Log the internal schema breakdown safely for your developers
        console.error(
          "Outgoing response validation failed:",
          result.error.format(),
        );

        // Return a 500 Internal Server Error to the client to hide details
        return originalJson.call(this, {
          status: "error",
          message: "Internal Server Error: Response validation failed.",
        });
      }

      // If valid, pass the stripped/parsed data to the original res.json
      return originalJson.call(this, result.data);
    };

    next();
  };
};
