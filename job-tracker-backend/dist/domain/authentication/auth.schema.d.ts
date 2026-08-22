import { z } from "zod";
export declare const registerUserResponse: z.ZodObject<{
    message: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const registerUserBody: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginUserBody: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const userHeaders: z.ZodObject<{
    authorization: z.ZodString;
}, z.core.$strip>;
export declare const logoutResponse: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export declare const registerUserRequest: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginUserRequest: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const registerUserSchema: z.ZodObject<{
    request: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodEmail;
            password: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        message: z.ZodString;
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginUserSchema: z.ZodObject<{
    request: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodEmail;
            password: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        message: z.ZodString;
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateGeminiApiKeyBody: z.ZodObject<{
    geminiApiKey: z.ZodString;
}, z.core.$strip>;
export declare const updateGeminiApiKeyRequest: z.ZodObject<{
    body: z.ZodObject<{
        geminiApiKey: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateGeminiApiKeySchema: z.ZodObject<{
    request: z.ZodObject<{
        body: z.ZodObject<{
            geminiApiKey: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map