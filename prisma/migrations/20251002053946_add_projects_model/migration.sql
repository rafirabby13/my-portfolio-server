-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "stack" TEXT,
    "description" TEXT,
    "liveLink" TEXT,
    "details" TEXT,
    "github" TEXT,
    "challenges" TEXT,
    "futurePlans" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
