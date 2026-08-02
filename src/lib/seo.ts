import type { Metadata } from "next";

import { profile } from "@/content/profile";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Path beginning with `/`, e.g. `/projects/foo`. */
  path: string;
  /** Absolute URL or site-relative path for the preview image. */
  image?: string;
  /** Open Graph type — default website; use article for case files when useful. */
  type?: "website" | "article";
};

function resolveImageUrl(image?: string): string {
  if (!image) return `${siteUrl}/opengraph-image`;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  const path = image.startsWith("/") ? image : `/${image}`;
  return `${siteUrl}${path}`;
}

/** Shared metadata builder — unique title, description, OG image, and canonical per page. */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const imageUrl = resolveImageUrl(image);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: profile.name,
      title,
      description,
      locale: "en_US",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: siteTitle,
    description: siteDescription,
    applicationName: "Nikolaos Giakoumidis — Portfolio",
    authors: [{ name: profile.name, url: profile.links.linkedin }],
    creator: profile.name,
    ...buildPageMetadata({
      title: siteTitle,
      description: siteDescription,
      path: "/",
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
