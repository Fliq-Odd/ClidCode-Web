import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CLIQ Code | AI Coding Agent for the Terminal",
    template: "%s | CLIQ Code",
  },
  description: "CLIQ Code is a model-agnostic AI coding assistant with a C++ engine, Python LLM brain, and permission controls for terminal workflows.",
  applicationName: "CLIQ Code",
  authors: [{ name: "Fliq-Odd Team" }],
  creator: "Fliq-Odd Team",
  publisher: "Fliq-Odd Team",
  alternates: { canonical: "/" },
  keywords: ["AI coding assistant", "terminal coding agent", "C++ coding tool", "Python LLM agent"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CLIQ Code",
    title: "CLIQ Code | AI Coding Agent for the Terminal",
    description: "A model-agnostic AI coding assistant with a C++ engine, Python LLM brain, and permission controls for terminal workflows.",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CLIQ Code AI coding agent" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLIQ Code | AI Coding Agent for the Terminal",
    description: "A model-agnostic AI coding assistant with a C++ engine, Python LLM brain, and permission controls for terminal workflows.",
    images: ["/opengraph-image"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#F3F4F6]">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Fliq-Odd Team",
                  url: siteUrl,
                  sameAs: ["https://github.com/fliq-odd/cliq-code"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: "CLIQ Code",
                  url: siteUrl,
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "CLIQ Code",
                  applicationCategory: "DeveloperApplication",
                  operatingSystem: "Windows, macOS, Linux",
                  description: "A model-agnostic AI coding assistant with a C++ engine and Python-powered LLM brain for terminal workflows.",
                  url: siteUrl,
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
