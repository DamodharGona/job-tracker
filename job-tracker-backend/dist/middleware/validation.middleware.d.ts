import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
export declare const validateRequest: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const validateResponse: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.middleware.d.ts.map