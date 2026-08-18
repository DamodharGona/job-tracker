import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import pg from "pg";
import "dotenv/config";
/*

* connection string
* pool
* adapter
* singleton

*/
const globalForPrisma = globalThis;
let prismaInstance;
if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
}
else {
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
    const adapter = new PrismaPg(pool);
    prismaInstance = new PrismaClient({ adapter });
    if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = prismaInstance;
    }
}
export const prisma = prismaInstance;
//# sourceMappingURL=prisma.js.map