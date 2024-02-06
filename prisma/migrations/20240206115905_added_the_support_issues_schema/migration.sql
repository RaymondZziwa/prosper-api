/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Scouts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tel1]` on the table `Scouts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tel1]` on the table `Talents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Issues" (
    "issueId" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isSolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Issues_pkey" PRIMARY KEY ("issueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scouts_email_key" ON "Scouts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Scouts_tel1_key" ON "Scouts"("tel1");

-- CreateIndex
CREATE UNIQUE INDEX "Talents_tel1_key" ON "Talents"("tel1");
