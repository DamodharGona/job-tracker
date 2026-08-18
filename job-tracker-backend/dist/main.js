import "dotenv/config";
import { app } from "./app.js";
import { prisma } from "./config/prisma.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error("PORT environment variable is not set");
}
async function bootstrap() {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map