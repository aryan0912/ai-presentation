import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ai-presentation',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
