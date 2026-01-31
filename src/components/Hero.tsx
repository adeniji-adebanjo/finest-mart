"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Shield, Truck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { products } from "@/data/products";

// Get a selection of featured products for hero
const featuredProducts = products
  .filter((p) => p.isBestSeller || p.isNew)
  .slice(0, 4);

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-0 sm:pb-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 ght-gradient-subtle" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent blur-3xl" />

      {/* Animated blob background */}
      <div className="absolute top-[10%] right-[15%] w-160 h-160 bg-primary/10 rounded-full blur-[120px] z-0 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="flex flex-col space-y-8 z-10">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full w-fit"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-bold text-primary tracking-tight">
                Empowering Wellness Over 50,000+ Journeys
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tighter">
                Premium Health <br />
                <span className="ght-text-gradient">Treatment Essentials</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed font-medium">
                Experience the next generation of healthcare commerce. Quality
                products, certified wellness advice, and seamless delivery.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-md group"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative">
                <Input
                  type="text"
                  placeholder="What health care do you need today?"
                  className="pl-6 pr-14 py-6 sm:py-7 rounded-2xl shadow-xl border-border/50 bg-white/80 backdrop-blur-sm focus-visible:ring-primary text-sm sm:text-base font-medium"
                />
                <Button
                  size="icon"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 ght-gradient text-white rounded-xl shadow-lg hover:shadow-primary/40 transition-all hover:scale-105"
                >
                  <Search size={20} />
                </Button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                asChild
                size="lg"
                className="ght-gradient text-white shadow-xl shadow-primary/20 hover:opacity-90 rounded-2xl px-8 py-7 h-auto font-black text-lg transition-all hover:scale-[1.02]"
              >
                <Link href="/products" className="flex items-center gap-2">
                  Explore Products
                  <ArrowRight size={20} className="ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-2xl px-8 py-7 h-auto border-primary/20 bg-background/50 backdrop-blur-sm text-primary font-bold hover:bg-primary/5 transition-all text-lg"
              >
                <Link href="/consultations">Virtual Consultation</Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-x-8 gap-y-4 pt-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    Certified
                  </span>
                  <span className="text-sm font-bold">FDA Approved</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Truck size={20} className="text-secondary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    Logistics
                  </span>
                  <span className="text-sm font-bold">Free Shipping</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Product Showcase */}
          <div className="relative lg:pl-12">
            {/* Main Image Area */}
            <div className="relative z-10">
              {/* Featured Product Cards Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                  >
                    <Card
                      className={cn(
                        "group hover:shadow-2xl transition-all duration-500 border-border/50 bg-white/90 backdrop-blur-md overflow-hidden rounded-[2rem]",
                        index === 0 ? "lg:-translate-y-6" : "",
                        index === 3 ? "lg:translate-y-6" : "",
                      )}
                    >
                      <CardContent className="p-4 sm:p-5">
                        <div className="aspect-square bg-linear-to-br from-primary/5 to-secondary/10 rounded-2xl mb-4 overflow-hidden flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={120}
                            height={120}
                            className="object-contain group-hover:scale-125 transition-transform duration-700 relative z-10"
                          />
                          {product.isNew && (
                            <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg z-20">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                            {product.category.replace("-", " ")}
                          </p>
                          <h4 className="font-bold text-foreground text-sm sm:text-base truncate leading-tight">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <p className="text-primary font-black text-base">
                              ${product.price.toFixed(2)}
                            </p>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight size={14} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Stats Badge */}
              <motion.div
                variants={itemVariants}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl px-6 sm:px-10 py-5 sm:py-6 flex items-center gap-6 sm:gap-12 border border-primary/10 min-w-[340px] justify-center"
              >
                <div className="text-center group cursor-default">
                  <p className="text-2xl sm:text-3xl font-black text-primary group-hover:scale-110 transition-transform">
                    10K+
                  </p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 whitespace-nowrap">
                    Products
                  </p>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div className="text-center group cursor-default">
                  <p className="text-2xl sm:text-3xl font-black text-primary group-hover:scale-110 transition-transform">
                    50K+
                  </p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 whitespace-nowrap">
                    Customers
                  </p>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div className="text-center group cursor-default">
                  <p className="text-2xl sm:text-3xl font-black text-primary group-hover:scale-110 transition-transform">
                    4.9
                  </p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 whitespace-nowrap">
                    Rating
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
