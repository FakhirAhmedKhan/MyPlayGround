import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMetaData } from "@/lib/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <meta
          name="google-site-verification"
          content="MD4saVzc9gGPBrXqc6YtK6TuvH2RDzKlVMo0uqSY8Bo"
        />
      </head>
      <body className="bg-[rgb(10,10,15)] text-slate-50 antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
