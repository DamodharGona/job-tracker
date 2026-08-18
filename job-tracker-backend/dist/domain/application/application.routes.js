import express, {} from "express";
import { ApplicationService } from "./application.service.js";
import { validateRequest } from "../../middleware/validation.middleware.js";
import { createJobApplicationRequest, getAllJobApplicationsRequest, getJobApplicationRequest, updateJobApplicationRequest, deleteJobApplicationRequest, jobApplicationQuery, callGeminiRequest, } from "./application.schema.js";
import { authMiddleWare } from "../../middleware/auth.middleware.js";
import fs from "node:fs/promises";
import { convertDocumentToMarkdown } from "../../utils/document-converter.js";
import { documentUpload } from "../../middleware/document-upload.middleware.js";
import path from "node:path";
const router = express.Router();
const { createJobApplicationService, getAllJobApplicationsService, getJobApplicationService, updateJobApplicationService, deleteJobApplicationService, getJobApplicationsMetricsService, callGeminiService, } = ApplicationService();
router.use("/", authMiddleWare);
const createJobApplication = async (req, res) => {
    const payload = req.user;
    const userId = payload.userId;
    const result = await createJobApplicationService(userId, req.body);
    res.status(201).json(result);
};
const getAllJobApplications = async (req, res) => {
    const query = jobApplicationQuery.parse(req.query);
    const { status, searchText, page, limit, whatFor } = query;
    const payload = req.user;
    const userId = payload.userId;
    console.log("get all application router is called");
    const result = await getAllJobApplicationsService(userId, limit, page, status, searchText, whatFor);
    res.status(200).json(result);
};
const getJobApplication = async (req, res) => {
    const payload = req.user;
    const userId = payload.userId;
    const result = await getJobApplicationService(req.params.id, userId);
    res.status(200).json(result);
};
const updateJobApplication = async (req, res) => {
    const payload = req.user;
    const userId = payload.userId;
    const result = await updateJobApplicationService(req.params.id, userId, req.body);
    res.status(200).json(result);
};
const deleteJobApplication = async (req, res) => {
    const payload = req.user;
    const userId = payload.userId;
    const result = await deleteJobApplicationService(req.params.id, userId);
    res.status(200).send(result);
};
const applicationsMetrics = async (req, res) => {
    const payload = req.user;
    const userId = payload.userId;
    const result = await getJobApplicationsMetricsService(userId);
    res.status(200).send(result);
};
export async function jdKeyWordMatcher(req, res) {
    const file = req.file;
    if (!file) {
        res.status(400).json({
            success: false,
            message: "Resume file is required",
        });
        return;
    }
    try {
        const payload = req.user;
        const userId = payload.userId;
        const markdown = await convertDocumentToMarkdown(file.path);
        console.log("markdown file: ", markdown);
        const { jobDescription } = req.body;
        const filePath = path.join(process.cwd(), "prompt.txt");
        const prompt = await fs.readFile(filePath, "utf-8");
        const result = await callGeminiService(userId, prompt, markdown, jobDescription);
        console.log("keyword response", result);
        res.status(200).json({ result });
    }
    finally {
        await fs.unlink(file.path).catch(() => undefined);
    }
}
// const callGemini = async (req: Request, res: Response): Promise<void> => {
//   const payload = req.user as { userId: string; email: string };
//   const userId = payload.userId;
//   const result = await callGeminiService(userId, req.body.prompt);
//   res.status(200).send(result);
// };
/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job Applications APIs
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 *   schemas:
 *     JobApplicationInput:
 *       type: object
 *       required:
 *         - companyName
 *         - jobTitle
 *         - salaryRange
 *         - location
 *       properties:
 *         userId:
 *           type:string
 *           example:"140908b1-f5dd-41dc-86ea-a719492c3a05"
 *         companyName:
 *           type: string
 *           example: "Google"
 *         jobTitle:
 *           type: string
 *           example: "Software Engineer"
 *         salaryRange:
 *           type: string
 *           example: "$120k - $150k"
 *         location:
 *           type: string
 *           example: "Remote"
 *         status:
 *           type: string
 *           example: "PENDING"
 *         dueDate:
 *           type: string
 *           example: "2026-08-01"
 *         stage:
 *           type: string
 *           example: "Initial Screen"
 *         mode:
 *           type: string
 *           example: "Full-Time"
 *     JobApplicationUpdateInput:
 *       type: object
 *       properties:
 *         userId:
 *           type:string
 *         companyName:
 *           type: string
 *         jobTitle:
 *           type: string
 *         salaryRange:
 *           type: string
 *         location:
 *           type: string
 *         status:
 *           type: string
 *         dueDate:
 *           type: string
 *         stage:
 *           type: string
 *         mode:
 *           type: string
 *     JobApplicationResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         companyName:
 *           type: string
 *         jobTitle:
 *           type: string
 *         salaryRange:
 *           type: string
 *         location:
 *           type: string
 *         status:
 *           type: string
 *         dueDate:
 *           type: string
 *         stage:
 *           type: string
 *         mode:
 *           type: string
 */
/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Create a new job application
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobApplicationInput'
 *     responses:
 *       201:
 *         description: Job application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplicationResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", validateRequest(createJobApplicationRequest), createJobApplication);
/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all job applications
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter applications by current progress status
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *         description: Full-text search matching company name or job title
 *     responses:
 *       200:
 *         description: A list of matching job applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobApplicationResponse'
 *       401:
 *         description: Unauthorized
 */
router.get("/", validateRequest(getAllJobApplicationsRequest), getAllJobApplications);
/**
 * @swagger
 * /api/applications/dashboard:
 *   post:
 *     summary: get applications dashboard metrics
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Job applications metrics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplicationResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.get("/dashboard", applicationsMetrics);
/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get a specific job application by ID
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Valid UUID of the target application record
 *     responses:
 *       200:
 *         description: Job application fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplicationResponse'
 *       400:
 *         description: Invalid UUID layout format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.get("/:id", validateRequest(getJobApplicationRequest), getJobApplication);
/**
 * @swagger
 * /api/applications/{id}:
 *   patch:
 *     summary: Update an existing job application
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Valid UUID of the target application record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobApplicationUpdateInput'
 *     responses:
 *       200:
 *         description: Application altered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplicationResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.patch("/:id", validateRequest(updateJobApplicationRequest), updateJobApplication);
/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Delete a job application record
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Valid UUID of the target application record
 *     responses:
 *       204:
 *         description: Application removed successfully, no body returned
 *       400:
 *         description: Invalid UUID layout format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.delete("/:id", validateRequest(deleteJobApplicationRequest), deleteJobApplication);
router.post("/jd-keyword-matcher", documentUpload.single("resume"), jdKeyWordMatcher);
// router.post("/call-gemini", validateRequest(callGeminiRequest), callGemini);
export default router;
//# sourceMappingURL=application.routes.js.map