/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `keyword_analysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `advisoryNote` to the `keyword_analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keywords` to the `keyword_analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tailoredBullets` to the `keyword_analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "keyword_analysis" ADD COLUMN     "advisoryNote" TEXT NOT NULL,
ADD COLUMN     "keywords" JSONB NOT NULL,
ADD COLUMN     "tailoredBullets" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "keyword_analysis_applicationId_key" ON "keyword_analysis"("applicationId");
