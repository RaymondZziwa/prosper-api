-- AlterTable
ALTER TABLE "Issues" ADD COLUMN     "supportResponse" TEXT;

-- AlterTable
ALTER TABLE "Scouts" ADD COLUMN     "accountActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Talents" ADD COLUMN     "accountActive" BOOLEAN NOT NULL DEFAULT true;
