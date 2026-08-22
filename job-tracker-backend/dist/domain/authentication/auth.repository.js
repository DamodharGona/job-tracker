import { prisma } from "../../config/prisma.js";
export function AuthRepository() {
    const registerUser = (input) => {
        return prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                passwordHash: input.passwordHash,
            },
        });
    };
    const getUserByEmail = (email) => {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    };
    const getUserById = (id) => {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    };
    const updateUserGeminiApiKey = (userId, geminiApiKey) => {
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
//# sourceMappingURL=auth.repository.js.map