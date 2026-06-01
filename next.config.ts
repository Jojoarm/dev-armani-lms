import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   hostname: 'dev-armani-lms.t3.tigrisfiles.io',
      //   port: '',
      //   protocol: 'https',
      // },
      {
        protocol: 'https',
        hostname: '*.tigrisfiles.io',
      },
      {
        protocol: 'https',
        hostname: 'dev-armani-lms.t3.storage.dev',
      },
    ],
  },
};

export default nextConfig;
