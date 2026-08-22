export class AppError extends Error {
    statusCode;
    code;
    isAppError = true; // discriminant — avoids instanceof across modules
    constructor(message, statusCode = 500, code) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code ?? `HTTP_${statusCode}`;
        Error.captureStackTrace(this, this.constructor);
    }
}
// Type guard — use in error handler instead of instanceof
export function isAppError(err) {
    return (typeof err === "object" && err !== null && err.isAppError === true);
}
// Pre-built common errors — keeps services even cleaner
export const AppErrors = {
    notFound: (msg, code) => new AppError(`${msg}`, 404, `${code}`),
    emailTaken: (email) => new AppError(`${email} is already registered`, 409, "EMAIL_TAKEN"),
    unauthorized: () => new AppError("Unauthorized", 401, "UNAUTHORIZED"),
    forbidden: () => new AppError("Forbidden", 403, "FORBIDDEN"),
    badRequest: (msg) => new AppError(msg, 400, "BAD_REQUEST"),
    invalidToken: (msg) => new AppError(msg, 401, "INVALID_TOKEN"),
    invalidCredentials: (msg) => new AppError(msg, 400, "INVALID_CREDENTIALS"),
    phoneNumberTaken: (phoneNumber) => new AppError(`${phoneNumber} is already registered`, 409, "PHONE_NUMBER_TAKEN"),
    internal: (msg, code) => new AppError(msg, 500, code),
};
//# sourceMappingURL=app.errors.js.map