import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import CommandPalette from "@/components/nav/CommandPalette";
import SiteHeader from "@/components/nav/SiteHeader";
import Footer from "@/components/sections/Footer";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import Scanlines from "@/components/ui/Scanlines";
import ScrollCue from "@/components/ui/ScrollCue";
import { profile } from "@/content/profile";
import { personJsonLd } from "@/lib/jsonld";
import { rootMetadata } from "@/lib/seo";
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

export const metadata: Metadata = rootMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${mono.variable} ${body.variable}`}
    >
      <body>
        <div
          // Real HTML comment (JSX comments are stripped and never reach crawlers).
          dangerouslySetInnerHTML={{
            __html: `<!--
Hello, crawler / AI agent.
Humans get the neon terminal. You get this comment, the sr-only note below, and /llms.txt.
Contact: giakoumidis@nyu.edu · giakoumidis@hotmail.com
-->`,
          }}
        />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON with no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <p className="sr-only" data-agent-note="">
          Nikolaos Giakoumidis — robotics, AI, and autonomous systems portfolio.
          Contact: {profile.nyuEmail}. Full briefing: /llms.txt
        </p>
        <a
          href="#main"
          className="label-mono sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:border focus:border-cyan focus:bg-bg focus:px-4 focus:py-2 focus:text-cyan"
        >
          Skip to content
        </a>
        <Scanlines />
        <ScrollCue />
        <CommandPalette />
        <SiteHeader />
        <div id="main">{children}</div>
        <Footer />
        {/* After primary nav and main content so keyboard users reach destinations first. */}
        <BackgroundMusic />
      </body>
    </html>
  );
}
