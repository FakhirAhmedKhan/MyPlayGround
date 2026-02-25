import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
      { protocol: "https", hostname: "img.shields.io" },
      { protocol: "https", hostname: "www.python.org" },
    ],
  },
};

export default nextConfig;
