import type { z } from "zod";
import type {
  createJobApplicationBody,
  updateJobApplicationBody,
} from "./application.schema.js";

export type CreateJobApplicationInput = z.infer<
  typeof createJobApplicationBody
>;
export type UpdateJobApplicationInput = z.infer<
  typeof updateJobApplicationBody
>;
