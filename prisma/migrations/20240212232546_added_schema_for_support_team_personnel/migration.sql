/*
  Warnings:

  - Added the required column `solvedBy` to the `Issues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issues" ADD COLUMN     "solvedBy" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Scouts" ADD COLUMN     "areDocumentsVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Talents" ADD COLUMN     "areDocumentsVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "supportTeam" (
    "Id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel1" TEXT NOT NULL,
    "tel2" TEXT,
    "profileImage" TEXT,
    "password" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "supportTeam_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supportTeam_email_key" ON "supportTeam"("email");

-- CreateIndex
CREATE UNIQUE INDEX "supportTeam_tel1_key" ON "supportTeam"("tel1");
