import { prisma } from "../../config/prisma.js";
import type {
  loginUserRepositoryInput,
  RegisterUserRepositoryInput,
} from "./auth.types.js";

export function AuthRepository() {
  const registerUser = (input: RegisterUserRepositoryInput) => {
    return prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
      },
    });
  };

  const getUserByEmail = (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  const getUserById = (id: string) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  };

  return {
    registerUser,
    getUserByEmail,
    getUserById,
  };
}
