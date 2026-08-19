import express, {} from "express";
import { AuthService } from "./auth.service.js";
import { validateRequest } from "../../middleware/validation.middleware.js";
import { loginUserRequest, loginUserSchema, registerUserRequest, registerUserSchema, } from "./auth.schema.js";
const router = express.Router();
const isProduction = process.env.NODE_ENV === "production";
const { registerUserService, loginUserService } = AuthService();
const registerUser = async (req, res) => {
    const result = await registerUserService(req.body);
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: isProduction,
        path: "/",
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).send({
        message: result.message,
        user: result.user,
    });
};
const loginUser = async (req, res) => {
    const result = await loginUserService(req.body);
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: isProduction,
        path: "/",
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        message: result.message,
        user: result.user,
    });
};
const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
    });
    res.status(200).json({
        message: "logged out successfully",
    });
};
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration, login, and session management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "jane.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: "Must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character."
 *           example: "SecureP@ss123"
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "jane.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "SecureP@ss123"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Authentication successful"
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             name:
 *               type: string
 *               example: "Jane Doe"
 *             email:
 *               type: string
 *               example: "jane.doe@example.com"
 */
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error (e.g., weak password, malformed email)
 *       409:
 *         description: Email address already registered
 */
router.post("/register", validateRequest(registerUserRequest), registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user and create a session
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "token=abc123xyz...; Path=/; HttpOnly; Secure"
 *             description: Contains the HTTP-only authorization token session cookie if you use cookies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password credentials
 */
router.post("/login", validateRequest(loginUserRequest), loginUser);
router.post("/logout", logoutUser);
export default router;
//# sourceMappingURL=auth.routes.js.map