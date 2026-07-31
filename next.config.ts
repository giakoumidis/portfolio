import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow iPhone / other devices on the LAN to load dev JS chunks (Next.js 16 blocks by default).
  allowedDevOrigins: ["192.168.1.*", "192.168.0.*", "10.0.0.*"],
  async redirects() {
    return [
      {
        source: "/infrastructure",
        destination: "/laboratories",
        permanent: true,
      },
      {
        source: "/infrastructure/:slug",
        destination: "/laboratories/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
