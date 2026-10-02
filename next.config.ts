import type { NextConfig } from "next";
import { cvDownloadFilename } from "./src/content/profile";

/** Browsers name a saved PDF from this header, not from the `/cv.pdf` URL. */
function cvContentDisposition(filename: string) {
  return `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

const nextConfig: NextConfig = {
  // Allow iPhone / other devices on the LAN to load dev JS chunks (Next.js 16 blocks by default).
  allowedDevOrigins: ["192.168.1.*", "192.168.0.*", "10.0.0.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/cv.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: cvContentDisposition(cvDownloadFilename),
          },
        ],
      },
    ];
  },
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
      {
        source: "/photos",
        destination: "/archive",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/work/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/map",
        destination: "/",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/resume",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
