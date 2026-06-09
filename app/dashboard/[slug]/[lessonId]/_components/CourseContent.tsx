'use client';

import { LessonContentType } from '@/app/data/course/get-lesson-content';
import { RenderDescription } from '@/components/rich-text-editor/RenderDescription';
import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/try-catch';
import { useConstructUrl } from '@/hooks/use-construct-url';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useTransition } from 'react';
import { markLessonComplete } from '../actions';
import { toast } from 'sonner';
import { useConfetti } from '@/hooks/use-confetti';

interface IAppProps {
  data: LessonContentType;
}

function VideoPlayer({
  thumbnailKey,
  videoKey,
}: {
  thumbnailKey: string;
  videoKey: string;
}) {
  const videoUrl = useConstructUrl(videoKey);
  const thumbnailUrl = useConstructUrl(thumbnailKey);

  if (!videoKey) {
    if (!thumbnailUrl) return null;
    return (
      <Image
        className="w-full rounded-t-lg aspect-video h-full object-cover"
        src={thumbnailUrl}
        alt="Thumbnail"
        width={600}
        height={400}
      />
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
      <video
        className="w-full h-full object-cover"
        controls
        poster={thumbnailUrl || undefined} // avoid empty string on poster too
      >
        {videoUrl && ( // only render sources once the URL is resolved
          <>
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
          </>
        )}
        Your browser does not support the video type
      </video>
    </div>
  );
}

export function CourseContent({ data }: IAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.Chapter.Course.slug),
      );

      if (error) {
        toast.error('An unexpected error occured. Please try again');
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }
  return (
    <div className="flex flex-col h-full bg-background pl-6 w-full">
      {data.thumbnailKey && (
        <VideoPlayer
          thumbnailKey={data.thumbnailKey!}
          videoKey={data.videoKey!}
        />
      )}
      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircle className="size-4 mr-2 text-green-500 " />
            Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={onSubmit} disabled={pending}>
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Mark as Complete
          </Button>
        )}
      </div>

      <div className="w-full space-y-3 pt-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {data.title}
        </h1>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}
