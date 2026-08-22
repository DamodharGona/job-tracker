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

  const updateUserGeminiApiKey = (userId: string, geminiApiKey: string) => {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        geminiApiKey,
      },
    });
  };

  return {
    registerUser,
    getUserByEmail,
    getUserById,
    updateUserGeminiApiKey,
  };
}
