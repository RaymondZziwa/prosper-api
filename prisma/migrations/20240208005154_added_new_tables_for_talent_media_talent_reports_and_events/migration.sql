-- AlterTable
ALTER TABLE "Talents" ADD COLUMN     "currentPlayerStatus" TEXT;

-- CreateTable
CREATE TABLE "talentMedia" (
    "talentId" SERIAL NOT NULL,
    "mediaUrl" TEXT NOT NULL,

    CONSTRAINT "talentMedia_pkey" PRIMARY KEY ("talentId")
);

-- CreateTable
CREATE TABLE "talentReport" (
    "reportId" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "talentReport_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "events" (
    "eventId" SERIAL NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventId")
);
