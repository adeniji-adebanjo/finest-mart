// src/app/layout.tsx
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LayoutWrapper } from "./layout-wrapper";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finest Mart - Fresh Groceries Online",
  description:
    "Get fresh groceries online with Finest Mart. Fast delivery, quality products, and great prices.",
  keywords: ["groceries", "online shopping", "fresh food", "delivery"],
  authors: [{ name: "Finest Mart" }],
  openGraph: {
    title: "Finest Mart - Fresh Groceries Online",
    description: "Get fresh groceries delivered to your doorstep",
    type: "website",
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
        className={`${raleway.variable} font-sans antialiased bg-gray-50 min-h-screen flex flex-col`}
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
