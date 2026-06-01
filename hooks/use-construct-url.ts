'use client';

import { useEffect, useState } from 'react';

export function useConstructUrl(key: string): string {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!key) return;

    fetch(`/api/s3/get-image?key=${encodeURIComponent(key)}`)
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch(() => setUrl(''));
  }, [key]);

  return url;
}
