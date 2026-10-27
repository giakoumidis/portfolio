import type { NextConfig } from "next";
import { cvDownloadFilename, cvHref } from "./src/content/profile";

/** Desktop browsers name a saved PDF from this header. Phones use `cvHref` instead. */
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
        source: cvHref,
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
      {
        source: "/cv.pdf",
        destination: cvHref,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
