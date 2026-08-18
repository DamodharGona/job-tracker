import jwt from "jsonwebtoken";
export declare function generateToken(payload: {
    userId: string;
    email: string;
}): string;
export declare function verifyToken(token: string): string | jwt.JwtPayload | null;
//# sourceMappingURL=jwt.d.ts.map