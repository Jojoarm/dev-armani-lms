'use client';

import { useEffect, useState } from 'react';

export function useConstructUrl(key: string): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!key) return;

    fetch(`/api/s3/get-image?key=${encodeURIComponent(key)}`)
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch(() => setUrl(null));
  }, [key]);

  return url;
}
