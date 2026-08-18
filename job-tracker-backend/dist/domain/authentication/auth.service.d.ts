import type { LoginUserServiceInput, registerUserServiceResponse, loginUserServiceResponse, RegisterUserServiceInput } from "./auth.types.js";
export declare function AuthService(): {
    registerUserService: (input: RegisterUserServiceInput) => Promise<registerUserServiceResponse>;
    loginUserService: (input: LoginUserServiceInput) => Promise<loginUserServiceResponse>;
};
//# sourceMappingURL=auth.service.d.ts.map