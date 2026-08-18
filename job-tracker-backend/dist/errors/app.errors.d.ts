export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    readonly isAppError = true;
    constructor(message: string, statusCode?: number, code?: string);
}
export declare function isAppError(err: unknown): err is AppError;
export declare const AppErrors: {
    notFound: (msg: string, code: string) => AppError;
    emailTaken: (email: string) => AppError;
    unauthorized: () => AppError;
    forbidden: () => AppError;
    badRequest: (msg: string) => AppError;
    invalidToken: (msg: string) => AppError;
    invalidCredentials: (msg: string) => AppError;
    phoneNumberTaken: (phoneNumber: string) => AppError;
};
//# sourceMappingURL=app.errors.d.ts.map