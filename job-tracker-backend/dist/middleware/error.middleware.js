import { isAppError } from "../errors/app.errors.js";
export function errorHandler(err, req, res, next) {
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
//# sourceMappingURL=error.middleware.js.map