import type z from "zod";
import type {
  loginUserBody,
  registerUserBody,
  registerUserResponse,
} from "./auth.schema.js";

export type registerUserRouterInput = z.infer<typeof registerUserBody>;
export type loginUserRouterInput = z.infer<typeof loginUserBody>;

export type RegisterUserServiceInput = registerUserRouterInput;
export type LoginUserServiceInput = loginUserRouterInput;

export type RegisterUserRepositoryInput = Omit<
  RegisterUserServiceInput,
  "password"
> & {
  passwordHash: string;
};

export type loginUserRepositoryInput = Omit<LoginUserServiceInput, "password">;

export type registerUserServiceResponse = z.infer<
  typeof registerUserResponse
> & { token: string };
export type loginUserServiceResponse = registerUserServiceResponse;
