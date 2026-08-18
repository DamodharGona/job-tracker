import type { Request, Response, NextFunction } from "express";
import { isAppError } from "../errors/app.errors.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (isAppError(err)) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
    console.log("is App error:", err.message, err.code);
    return;
  }

  if (err instanceof Error) {
    console.log(err);
    res.status(500).json({
      error: {
        message: err.message,
        code: "INTERNAL_SERVER_ERROR",
      },
    });
    return;
  }

  console.error("Unhandled system error:", err);
  res.status(500).json({
    error: {
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    },
  });
}
