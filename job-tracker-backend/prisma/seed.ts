import bcrypt from "bcrypt";

import { prisma } from "../src/config/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      name: "Damodhar",
      email: "damodhar@gmail.com",
      passwordHash,
    },
  });

  await prisma.jobApplication.create({
    data: {
      userId: user.id,
      companyName: "Dezoko",
      jobTitle: "FullStack Developer",
      salaryRange: "10LPA",
      location: "Remote",
    },
  });

  console.log("Seeded user:", user);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
