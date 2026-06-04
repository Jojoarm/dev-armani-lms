'use client';

import { useConstructUrl } from '@/hooks/use-construct-url';
import Image from 'next/image';

export function CourseImage({
  fileKey,
  alt,
}: {
  fileKey: string;
  alt: string;
}) {
  const thumbnailUrl = useConstructUrl(fileKey);
  if (!thumbnailUrl) return null;
  return (
    <Image
      src={thumbnailUrl}
      alt={alt}
      width={600}
      height={400}
      className="w-full rounded-t-lg aspect-video h-full object-cover"
      priority
    />
  );
}
