import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiclub.ics.uci.edu"),

  title: {
    default: "AI at UCI",
    template: `%s | AI at UCI`,
  },

  description:
    "AI at UCI is UC Irvine's student-run artificial intelligence club. Join workshops, projects, and a community of builders and researchers exploring AI on campus.",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiclub.ics.uci.edu",
    siteName: "AI at UCI",
    title: "AI at UCI",
    description:
      "AI at UCI is UC Irvine's student-run artificial intelligence club. Join workshops, projects, and a community of builders and researchers exploring AI on campus.",
    images: [
      {
        url: "/og-image.jpg",
        alt: "AI at UCI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI at UCI",
    description:
      "AI at UCI is UC Irvine's student-run artificial intelligence club. Join workshops, projects, and a community of builders and researchers exploring AI on campus.",
  },

  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
