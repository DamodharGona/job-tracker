import { AppErrors } from "../../errors/app.errors.js";
import { generateToken } from "../../utils/jwt.js";
import { encrypt } from "../../utils/encryption.js";
import { AuthRepository } from "./auth.repository.js";
import bcrypt from "bcrypt";
const { getUserByEmail, registerUser, getUserById, updateUserGeminiApiKey } = AuthRepository();
export function AuthService() {
    const registerUserService = async (input) => {
        const user = await getUserByEmail(input.email);
        if (user) {
            throw AppErrors.emailTaken("user already exists with this email");
        }
        const passwordHash = await bcrypt.hash(input.password, 10);
        const newUser = await registerUser({
            name: input.name,
            email: input.email,
            passwordHash,
        });
        const token = generateToken({ userId: newUser.id, email: newUser.email });
        return {
            message: "register successfully",
            token: token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                hasGeminiApiKey: false,
            },
        };
    };
    const loginUserService = async (input) => {
        const user = await getUserByEmail(input.email);
        if (!user) {
            throw AppErrors.notFound("user with this email does not exist please register", "USER_NOT_FOUND");
        }
        if (user.email !== input.email) {
            throw AppErrors.invalidCredentials("Invalid credentials. Please enter correct email/password");
        }
        const isMatched = await bcrypt.compare(input.password, user.passwordHash);
        if (!isMatched) {
            throw AppErrors.invalidCredentials("Invalid credentials. Please enter correct email/password");
        }
        const token = generateToken({ userId: user.id, email: user.email });
        const hasGeminiApiKey = user.geminiApiKey !== null;
        return {
            message: "logged in successfully",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                hasGeminiApiKey: hasGeminiApiKey,
            },
        };
    };
    const updateGeminiApiKeyService = async (userId, geminiApiKey) => {
        const user = await getUserById(userId);
        if (!user) {
            throw AppErrors.notFound("user does not exist", "USER_NOT_FOUND");
        }
        const encryptedKey = encrypt(geminiApiKey);
        const updatedUserDetails = await updateUserGeminiApiKey(userId, encryptedKey);
        return {
            message: "Gemini API Key updated successfully",
            user: {
                id: updatedUserDetails.id,
                name: updatedUserDetails.name,
                email: updatedUserDetails.email,
                hasGeminiApiKey: updatedUserDetails.geminiApiKey !== null,
            },
        };
    };
    return {
        registerUserService,
        loginUserService,
        updateGeminiApiKeyService,
    };
}
//# sourceMappingURL=auth.service.js.map