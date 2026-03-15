import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t9013332252.p.clickup-attachments.com",
      },
    ],
  },
};

export default nextConfig;
