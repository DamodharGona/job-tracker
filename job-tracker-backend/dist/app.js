import express from "express";
import cors from "cors";
import authRoutes from "./domain/authentication/auth.routes.js";
import applicationRoutes from "./domain/application/application.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
export const app = express();
app.use(cookieParser());
const allowedOrigins = [
    "https://yourfrontend.com",
    "http://localhost:4000",
    "http://localhost:5173",
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
}));
app.use(express.json());
app.get("/health", (_req, res) => {
    res.json({ message: "Server is running" });
});
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Applications API",
            version: "1.0.0",
            description: "API documentation for my job application tracker",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./src/domain/**/*.routes.ts", "./src/domain/**/*.routes.js"],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use(errorHandler);
//# sourceMappingURL=app.js.map