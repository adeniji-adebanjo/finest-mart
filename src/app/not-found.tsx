"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Home,
  ShoppingBag,
  ArrowLeft,
  Stethoscope,
  Pill,
  HeartPulse,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-soft" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-primary/10 mb-8 border border-primary/20 relative group">
            <HeartPulse
              size={48}
              className="text-primary group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-white font-bold text-xs shadow-lg animate-bounce">
              !
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl sm:text-9xl font-black mb-4 tracking-tighter">
            <span className="ght-text-gradient">404</span>
          </h1>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Diagnosis: <span className="text-destructive">Page Not Found</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
            It seems we've lost the prescription for this page. Don't worry, our
            specialist team is looking into it. In the meantime, let's get you
            back on track.
          </p>

          {/* Search Bar - Quick recovery */}
          <div className="relative max-w-md mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search for health products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                size={20}
              />
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="ght-gradient text-white rounded-2xl px-8 h-14 shadow-xl hover:opacity-90 transition-all"
            >
              <Link href="/">
                <Home size={20} className="mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl px-8 h-14 border-primary/20 hover:bg-primary/5 text-primary transition-all"
            >
              <Link href="/products">
                <ShoppingBag size={20} className="mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>

          {/* Help Links */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-border/50">
            <Link
              href="/faq"
              className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              <Stethoscope
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              Help Center
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              <Pill
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
              Contact Support
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translateX-1 transition-transform"
              />
              Learn About GHT
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
