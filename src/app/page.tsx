"use client";

import Hero from "../components/Hero";
import TrendingCategories from "../components/TrendingCategories";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { motion } from "framer-motion";

// Force dynamic rendering for pages using client-side state
export const dynamic = "force-dynamic";

// Featured products selection
const featuredProducts = products
  .filter((p) => p.isBestSeller || p.originalPrice !== undefined)
  .slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges - Mini Section */}
      <div className="bg-secondary/20 py-10 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">
                  Secure Payments
                </p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  100% Protected
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">
                  Fast Delivery
                </p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Island-wide
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <RotateCcw size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">
                  Easy Returns
                </p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  7-Day Window
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <BadgeCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">
                  Genuine Products
                </p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Certified Source
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <TrendingCategories />

      {/* Featured Products Section */}
      <section className="py-20 lg:py-32 bg-secondary/10 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Handpicked
                </span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                Featured <span className="ght-text-gradient">Essentials</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our best-selling health solutions chosen by experts and loved by
                thousands.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-primary/20 text-primary hover:bg-primary/5 px-8 h-12 font-bold shadow-sm"
            >
              <Link href="/products" className="flex items-center gap-2">
                Browse All Collection
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Advice / Brand Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-primary rounded-[3rem] p-8 sm:p-16 lg:p-24 relative overflow-hidden shadow-2xl shadow-primary/20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/pattern.svg')] opacity-5" />
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-white/70 font-black uppercase tracking-[0.3em] text-xs mb-6 block">
                Our Mission
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-[1.1]">
                Quality Healthcare <br />
                <span className="text-primary-foreground/60">
                  Accessible to All
                </span>
              </h2>
              <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-12">
                GHT (General Health Treatment) is dedicated to bridging the gap
                between premium wellness products and everyday healthcare. We
                source only the finest, certified supplements and medical gear.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-2xl px-8 h-14 font-black text-lg"
                >
                  <Link href="/about">Discover Our Story</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 h-14 font-bold text-lg"
                >
                  <Link href="/consultations">Free Consultation</Link>
                </Button>
              </div>
            </div>

            {/* Stats on the right (Desktop only) */}
            <div className="hidden lg:grid grid-cols-2 gap-8 absolute right-24 top-1/2 -translate-y-1/2 z-10 w-80">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <p className="text-3xl font-black text-white mb-1">99%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                  Success Rate
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 mt-8">
                <p className="text-3xl font-black text-white mb-1">24/7</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                  Expert Support
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <p className="text-3xl font-black text-white mb-1">100%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                  Original Gear
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 mt-8">
                <p className="text-3xl font-black text-white mb-1">50K+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                  Daily Parcels
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Newsletter
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Join the GHT{" "}
            <span className="ght-text-gradient">Health Circle</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto font-medium">
            Get early access to new products, wellness tips from our doctors,
            and exclusive member discounts.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto p-2 bg-white rounded-[2rem] shadow-xl border border-border/50">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-6 py-4 outline-none text-sm font-medium"
              required
            />
            <Button className="ght-gradient text-white rounded-2xl px-8 h-12 font-black shadow-lg shadow-primary/20">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-6 italic">
            * We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
