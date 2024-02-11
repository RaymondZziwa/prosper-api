-- CreateTable
CREATE TABLE "blogs" (
    "blogId" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blogId")
);

-- CreateTable
CREATE TABLE "successStories" (
    "storyId" SERIAL NOT NULL,
    "talentId" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "successStories_pkey" PRIMARY KEY ("storyId")
);

-- CreateTable
CREATE TABLE "partners" (
    "partnerId" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("partnerId")
);
