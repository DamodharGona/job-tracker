export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly isAppError = true; // discriminant — avoids instanceof across modules
  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code ?? `HTTP_${statusCode}`;
    Error.captureStackTrace(this, this.constructor);
  }
}
// Type guard — use in error handler instead of instanceof
export function isAppError(err: unknown): err is AppError {
  return (
    typeof err === "object" && err !== null && (err as any).isAppError === true
  );
}
// Pre-built common errors — keeps services even cleaner
export const AppErrors = {
  notFound: (msg: string, code: string) =>
    new AppError(`${msg}`, 404, `${code}`),
  emailTaken: (email: string) =>
    new AppError(`${email} is already registered`, 409, "EMAIL_TAKEN"),
  unauthorized: () => new AppError("Unauthorized", 401, "UNAUTHORIZED"),
  forbidden: () => new AppError("Forbidden", 403, "FORBIDDEN"),
  badRequest: (msg: string) => new AppError(msg, 400, "BAD_REQUEST"),
  invalidToken: (msg: string) => new AppError(msg, 401, "INVALID_TOKEN"),
  invalidCredentials: (msg: string) =>
    new AppError(msg, 400, "INVALID_CREDENTIALS"),
  phoneNumberTaken: (phoneNumber: string) =>
    new AppError(
      `${phoneNumber} is already registered`,
      409,
      "PHONE_NUMBER_TAKEN",
    ),
};
