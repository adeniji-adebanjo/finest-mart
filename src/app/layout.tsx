// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LayoutWrapper } from "./layout-wrapper";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GHT - General Health Treatment | Your Trusted Health Partner",
    template: "%s | GHT - General Health Treatment",
  },
  description:
    "GHT (General Health Treatment) is your trusted online destination for health products, supplements, medical equipment, and wellness essentials. Quality healthcare delivered to your doorstep.",
  keywords: [
    "health products",
    "supplements",
    "vitamins",
    "medical equipment",
    "wellness",
    "healthcare",
    "pharmacy",
    "online health store",
    "GHT",
    "General Health Treatment",
  ],
  authors: [{ name: "GHT - General Health Treatment" }],
  creator: "GHT Team",
  publisher: "GHT - General Health Treatment",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "GHT - General Health Treatment",
    description:
      "Your trusted online destination for health products, supplements, and wellness essentials.",
    type: "website",
    locale: "en_US",
    siteName: "GHT - General Health Treatment",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHT - General Health Treatment",
    description:
      "Your trusted online destination for health products and wellness essentials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background min-h-screen flex flex-col`}
      >
        <ErrorBoundary>
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
