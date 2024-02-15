-- CreateTable
CREATE TABLE "TalentInquiries" (
    "inquiryId" SERIAL NOT NULL,
    "scoutId" INTEGER NOT NULL,
    "talentIds" INTEGER[],
    "notes" TEXT NOT NULL,
    "inquiryResponse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TalentInquiries_pkey" PRIMARY KEY ("inquiryId")
);
