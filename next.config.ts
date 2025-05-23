import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.120.9',
        port:'',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
