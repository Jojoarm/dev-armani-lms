-- Rename enum values for CourseLevel
ALTER TYPE "CourseLevel" RENAME VALUE 'BEGINNER' TO 'Beginner';
ALTER TYPE "CourseLevel" RENAME VALUE 'INTERMEDIATE' TO 'Intermediate';
ALTER TYPE "CourseLevel" RENAME VALUE 'ADVANCED' TO 'Advanced';

-- Rename enum values for CourseStatus
ALTER TYPE "CourseStatus" RENAME VALUE 'DRAFT' TO 'Draft';
ALTER TYPE "CourseStatus" RENAME VALUE 'PUBLISHED' TO 'Published';
ALTER TYPE "CourseStatus" RENAME VALUE 'ARCHIVED' TO 'Archived';

-- Rename table from Course to course
ALTER TABLE "Course" RENAME TO "course";

-- Update default values to match new enum values
ALTER TABLE "course" ALTER COLUMN "level" SET DEFAULT 'Beginner';
ALTER TABLE "course" ALTER COLUMN "status" SET DEFAULT 'Draft';

-- Add missing index
CREATE INDEX "course_userId_idx" ON "course"("userId");