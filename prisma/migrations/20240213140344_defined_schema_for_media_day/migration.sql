-- AlterTable
ALTER TABLE "talentMedia" ADD COLUMN     "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "scheduledMediaDays" (
    "mediaDayId" SERIAL NOT NULL,
    "talentId" INTEGER NOT NULL,
    "scheduledDate" TIMESTAMP(3),

    CONSTRAINT "scheduledMediaDays_pkey" PRIMARY KEY ("mediaDayId")
);
