import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Note: if deploying to a repo like https://username.github.io/repo-name/
  // you might need to set basePath: '/repo-name' in the future.
};

export default nextConfig;
