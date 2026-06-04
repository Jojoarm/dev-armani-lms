import { PublicCourseType } from '@/app/data/course/get-all-courses';
import { CourseImage } from '@/components/general/CourseImage';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { School, Timer } from 'lucide-react';
import Link from 'next/link';

interface IAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: IAppProps) {
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.level}</Badge>
      <CourseImage
        alt={`${data.title} thumbnail image`}
        fileKey={data.fileKey}
      />

      <CardContent className="p-4">
        <Link
          href={`/courses/${data.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Timer className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">
              {data.duration} hours
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.category}</p>
          </div>
        </div>

        <Link
          href={`/courses/${data.slug}`}
          className={buttonVariants({ className: 'w-full mt-4' })}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
}
