-- CreateTable
CREATE TABLE "Talent" (
    "talentId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "tel1" TEXT NOT NULL,
    "tel2" TEXT,
    "nok_firstName" TEXT NOT NULL,
    "nok_lastName" TEXT NOT NULL,
    "nok_relationship" TEXT NOT NULL,
    "nok_tel1" TEXT NOT NULL,
    "nok_tel2" TEXT,
    "nok_email" TEXT,
    "profileImage" TEXT,
    "primaryPosition" TEXT NOT NULL,
    "secondaryPosition" TEXT,
    "educationLevel" TEXT,
    "category" TEXT,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "preferredFoot" TEXT,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("talentId")
);

-- CreateTable
CREATE TABLE "Scout" (
    "scoutId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel1" TEXT NOT NULL,
    "tel2" TEXT,
    "nationality" TEXT NOT NULL,
    "profileImage" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scout_pkey" PRIMARY KEY ("scoutId")
);
