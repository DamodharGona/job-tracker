import type { RegisterUserRepositoryInput } from "./auth.types.js";
export declare function AuthRepository(): {
    registerUser: (input: RegisterUserRepositoryInput) => import("../../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getUserByEmail: (email: string) => import("../../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getUserById: (id: string) => import("../../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
};
//# sourceMappingURL=auth.repository.d.ts.map