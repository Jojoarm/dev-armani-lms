import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { SectionCards } from '@/components/section-cards';
import { adminGetEnrollmentStats } from '../data/admin/admin-get-enrollment-stats';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { adminGetRecentCourses } from '../data/admin/admin-get.recent-courses';
import { EmptyState } from '@/components/general/EmptyState';
import { AdminCourseCard } from './courses/_components/AdminCourseCard';
import { Suspense } from 'react';
import { AdminCourseCardSkeleton } from './courses/_components/AdminCourseCardSkeleton';

export default async function Page() {
  const enrollmentData = await adminGetEnrollmentStats();
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            href="/admin/coureses"
            className={buttonVariants({ variant: 'outline' })}
          >
            View All Courses
          </Link>
        </div>

        <Suspense fallback={<RenderRecentCoursesSkeleton />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Create New Course"
        description="You dont have any courses. Create some to see them here"
        title="You dont have any courses yet"
        href="/admin/courses/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

async function RenderRecentCoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
