-- CreateTable
CREATE TABLE "keyword_analysis" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keyword_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "keyword_analysis_applicationId_idx" ON "keyword_analysis"("applicationId");

-- AddForeignKey
ALTER TABLE "keyword_analysis" ADD CONSTRAINT "keyword_analysis_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "job_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
