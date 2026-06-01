/*
  Warnings:

  - Added the required column `position` to the `lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lesson" ADD COLUMN     "position" INTEGER NOT NULL;
