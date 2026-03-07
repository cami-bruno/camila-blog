import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://camilabruno.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Camila Bruno — Biotech Lab Notebook",
    template: "%s | Camila Bruno",
  },
  description:
    "Biotechnology Engineering student at Universidad ORT Uruguay. Writing about biotech insights, human genetics, lab notes, and practical reflections.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Camila Bruno",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: { "application/rss+xml": `${siteUrl}/rss.xml` },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
