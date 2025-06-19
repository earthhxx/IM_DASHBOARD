// next.config.ts
import { NextConfig } from 'next';
import dotenv from 'dotenv';

dotenv.config(); // โหลด .env ก่อนใช้งาน process.env

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ปิด ESLint ตอน build
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.IMAGE_HOST || '192.168.120.9',
        port: process.env.IMAGE_PORT || '', // ถ้าเป็น empty string จะไม่ระบุ port
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
