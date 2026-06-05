/*
  Warnings:

  - A unique constraint covering the columns `[stripePriceId]` on the table `course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "course" ADD COLUMN     "stripePriceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "course_stripePriceId_key" ON "course"("stripePriceId");
