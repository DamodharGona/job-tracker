import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import { AppErrors } from "../errors/app.errors.js";
import jwt from "jsonwebtoken";

export function authMiddleWare(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log("cookies:", request.cookies);
  console.log("token:", request.cookies?.token);

  const token = request.cookies?.token;

  if (!token) {
    throw AppErrors.unauthorized();
  }

  try {
    const decoded = verifyToken(token);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      typeof decoded.userId !== "string"
    ) {
      throw AppErrors.invalidToken("Invalid or expired token");
    }

    request.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      response.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
      next(AppErrors.invalidToken("Session expired. Please log in again."));
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      next(AppErrors.invalidToken("Invalid authentication token"));
      return;
    }

    next(error);
  }
}
