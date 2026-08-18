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
    return {
        registerUser,
        getUserByEmail,
        getUserById,
    };
}
//# sourceMappingURL=auth.repository.js.map