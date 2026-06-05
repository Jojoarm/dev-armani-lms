/*
  Warnings:

  - Made the column `stripePriceId` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "course" ALTER COLUMN "stripePriceId" SET NOT NULL;
