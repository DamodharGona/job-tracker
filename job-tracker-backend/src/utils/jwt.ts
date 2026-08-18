import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  console.log("jwt secret is not configured");
  throw new Error("JWT_SECRET environment variable is not configured");
}

const SECRET = process.env.JWT_SECRET;

export function generateToken(payload: { userId: string; email: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    console.log("error while verifying the token", e);
    return null;
  }
}
