import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.graphassets.com" },
      { protocol: "https", hostname: "**.graphassets.com" },
    ],
  },
};

export default nextConfig;