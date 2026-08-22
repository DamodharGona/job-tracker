import { z } from "zod";

/*
(?=.*[a-z])               At least one lowercase letter
(?=.*[A-Z])               At least one uppercase letter
(?=.*\d)                  At least one digit
(?=.*[@$!%*?&^#()_\-+=])  At least one special character
[A-Za-z\d@$!%*?&^#()_\-+=]{8,}  Allowed characters, minimum length 8
*/

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

export const registerUserResponse = z.object({
  message: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    hasGeminiApiKey: z.boolean(),
  }),
});

export const registerUserBody = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.email("Please enter a valid email address").trim().toLowerCase(),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character.",
    ),
});

export const loginUserBody = z.object({
  email: z.email("Please enter a valid email address").trim().toLowerCase(),

  password: z.string().min(1, "Password is required"),
});

export const userHeaders = z.object({
  authorization: z
    .string()
    .regex(
      /^Bearer\s.+$/,
      "Authorization header must be in the format: Bearer <token>",
    ),
});

export const logoutResponse = z.object({
  message: z.string(),
});

export const registerUserRequest = z.object({
  body: registerUserBody,
});

export const loginUserRequest = z.object({
  body: loginUserBody,
});

//////////////// * endpoint contracts ////////////////////

export const registerUserSchema = z.object({
  request: registerUserRequest,
  response: registerUserResponse,
});

export const loginUserSchema = z.object({
  request: loginUserRequest,
  response: registerUserResponse,
});

export const updateGeminiApiKeyBody = z.object({
  geminiApiKey: z.string().min(1, "Gemini API key is required"),
});

export const updateGeminiApiKeyRequest = z.object({
  body: updateGeminiApiKeyBody,
});

export const updateGeminiApiKeySchema = z.object({
  request: updateGeminiApiKeyRequest,
  response: z.object({
    message: z.string(),
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      hasGeminiApiKey: z.boolean(),
    }).optional(),
  }),
});
