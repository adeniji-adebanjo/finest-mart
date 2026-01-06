import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export const metadata: Metadata = {
  title: "Finest Mart",
  description: "Get fresh groceries online with Finest Mart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} font-sans antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>

          <footer className="py-8 text-center text-gray-500 text-sm bg-white border-t border-gray-100">
            © {new Date().getFullYear()} Finest Mart. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
