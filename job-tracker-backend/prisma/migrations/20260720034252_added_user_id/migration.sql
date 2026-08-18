/*
  Warnings:

  - Added the required column `updatedAt` to the `job_applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `job_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_applications" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "job_applications_userId_idx" ON "job_applications"("userId");
