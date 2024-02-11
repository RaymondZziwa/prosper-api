/*
  Warnings:

  - You are about to drop the `blogs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thumbnail` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `talentId` to the `talentReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "talentReport" ADD COLUMN     "talentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "blogs";

-- CreateTable
CREATE TABLE "articles" (
    "articleId" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("articleId")
);
