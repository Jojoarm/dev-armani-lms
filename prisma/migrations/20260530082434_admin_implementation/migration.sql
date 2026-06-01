-- AlterTable
ALTER TABLE "course" RENAME CONSTRAINT "Course_pkey" TO "course_pkey";

-- RenameForeignKey
ALTER TABLE "course" RENAME CONSTRAINT "Course_userId_fkey" TO "course_userId_fkey";

-- RenameIndex
ALTER INDEX "Course_slug_key" RENAME TO "course_slug_key";
