import { response } from "express";
import { z } from "zod";
export const createJobApplicationBody = z.object({
    companyName: z
        .string()
        .trim()
        .min(1, "Company name must be at least 1 character"),
    jobTitle: z.string().trim().min(1, "Job title must be at least 1 character"),
    salaryRange: z
        .string()
        .trim()
        .min(1, "Salary range must be at least 1 character"),
    location: z.string().trim().min(1, "Location must be at least 1 character"),
    status: z.string().trim().optional(),
    dueDate: z.string().trim().optional(),
    stage: z.string().trim().optional(),
    mode: z.string().trim().optional(),
});
export const updateJobApplicationBody = createJobApplicationBody.partial();
export const jobApplicationParams = z.object({
    id: z.string().uuid("Invalid job application ID format"),
});
export const jobApplicationQuery = z.object({
    status: z.string().optional(),
    searchText: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    whatFor: z.string().optional(),
});
export const createJobApplicationResponse = createJobApplicationBody;
export const createJobApplicationRequest = z.object({
    body: createJobApplicationBody,
});
export const updateJobApplicationRequest = z.object({
    params: jobApplicationParams,
    body: updateJobApplicationBody,
});
export const getJobApplicationRequest = z.object({
    params: jobApplicationParams,
});
export const deleteJobApplicationRequest = z.object({
    params: jobApplicationParams,
});
export const getAllJobApplicationsRequest = z.object({
    query: jobApplicationQuery,
});
export const callGeminiRequest = z.object({
    body: z.object({
        prompt: z
            .string()
            .trim()
            .min(5, "Prompt must contain at least 5 characters"),
    }),
});
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const getKeyWordMatcherRequest = z.object({
    body: z.object({
        resume: z
            .instanceof(File)
            .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "Max image size is 5MB.",
        })
            .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
            message: "Only .pdf and .docx formats are supported.",
        }),
        jobDescription: z.string().min(100, "Job description is required"),
    }),
});
const keyWordMatcherResponseSchema = z.object({
    keywords: z.array(z.object({
        keyword: z.string(),
        importance_rank: z.number(),
    })),
    tailored_bullets: z.array(z.object({
        bullet_line: z.string(),
        source_line: z.string(),
    })),
    advisory_note: z.string(),
});
// Endpoint contracts
export const createJobApplicationSchema = z.object({
    request: createJobApplicationRequest,
    response: createJobApplicationResponse,
});
export const updateJobApplicationSchema = z.object({
    request: updateJobApplicationRequest,
    response: createJobApplicationResponse,
});
export const getJobApplicationSchema = z.object({
    request: getJobApplicationRequest,
    response: createJobApplicationResponse,
});
export const deleteJobApplicationSchema = z.object({
    request: deleteJobApplicationRequest,
    response: createJobApplicationResponse,
});
export const getAllJobApplicationsSchema = z.object({
    request: getAllJobApplicationsRequest,
});
//# sourceMappingURL=application.schema.js.map