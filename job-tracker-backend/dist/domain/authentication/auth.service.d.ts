import type { LoginUserServiceInput, registerUserServiceResponse, loginUserServiceResponse, RegisterUserServiceInput } from "./auth.types.js";
export declare function AuthService(): {
    registerUserService: (input: RegisterUserServiceInput) => Promise<registerUserServiceResponse>;
    loginUserService: (input: LoginUserServiceInput) => Promise<loginUserServiceResponse>;
    updateGeminiApiKeyService: (userId: string, geminiApiKey: string) => Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            hasGeminiApiKey: boolean;
        };
    }>;
    verifySessionService: (userId: string) => Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            hasGeminiApiKey: boolean;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map