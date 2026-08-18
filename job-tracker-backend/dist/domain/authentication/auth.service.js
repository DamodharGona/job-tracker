import { AppErrors } from "../../errors/app.errors.js";
import { generateToken } from "../../utils/jwt.js";
import { AuthRepository } from "./auth.repository.js";
import bcrypt from "bcrypt";
const { getUserByEmail, registerUser } = AuthRepository();
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
        return {
            message: "logged in successfully",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    };
    return {
        registerUserService,
        loginUserService,
    };
}
//# sourceMappingURL=auth.service.js.map