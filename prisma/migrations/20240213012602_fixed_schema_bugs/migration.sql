-- AlterTable
ALTER TABLE "Issues" ALTER COLUMN "solvedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "supportTeam" ALTER COLUMN "accountActive" SET DEFAULT false;
