import { getMetaData } from "@/lib/portfolio";
import type { Metadata } from "next";

const meta = getMetaData();

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: `${meta.name} — ${meta.title}`,
    template: `%s | ${meta.name}`,
  },
  description: meta.description,
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Portfolio",
    meta.name,
  ],
  authors: [{ name: meta.name }],
  creator: meta.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: meta.url,
    siteName: `${meta.name} Portfolio`,
    title: `${meta.name} — Full-Stack Developer`,
    description: meta.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${meta.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.name} — Full-Stack Developer`,
    description: meta.description,
    creator: meta.twitterHandle,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
