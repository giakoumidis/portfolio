import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import Scanlines from "@/components/ui/Scanlines";
import { profile } from "@/content/profile";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const display = Chakra_Petch({
  variable: "--font-chakra",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-inter",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Nikolaos Giakoumidis — Portfolio",
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  keywords: [
    "robotics engineer",
    "embodied AI",
    "physical AI",
    "autonomous systems",
    "multi-agent robotics",
    "industrial inspection",
    "digital twins",
    "sim2real",
    "lab automation",
    "NYU Abu Dhabi",
    "Nikolaos Giakoumidis",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: profile.name,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.currentRole.title,
  description: siteDescription,
  email: [`mailto:${profile.email}`, `mailto:${profile.nyuEmail}`],
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abu Dhabi",
    addressCountry: "AE",
  },
  worksFor: {
    "@type": "Organization",
    name: "New York University Abu Dhabi",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of the Aegean" },
    { "@type": "CollegeOrUniversity", name: "University of West Attica" },
  ],
  knowsAbout: [
    "Robotics",
    "Embodied AI",
    "Autonomous Systems",
    "Multi-Agent Systems",
    "Computer Vision",
    "Lab Automation",
  ],
  sameAs: Object.values(profile.links),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Static, developer-authored JSON with no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#about"
          className="label-mono sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:border focus:border-cyan focus:bg-bg focus:px-4 focus:py-2 focus:text-cyan"
        >
          Skip to content
        </a>
        <Scanlines />
        {children}
      </body>
    </html>
  );
}
