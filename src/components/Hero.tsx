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

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 ght-gradient-subtle" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full w-fit">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Trusted by 50,000+ customers
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Health,{" "}
                <span className="ght-text-gradient">Our Priority</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg">
                Discover premium health products, supplements, and wellness
                essentials. Quality healthcare delivered right to your doorstep
                with care.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-5 pr-14 py-5 sm:py-6 rounded-2xl shadow-lg border-border/50 bg-card focus-visible:ring-primary text-sm sm:text-base"
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 ght-gradient text-white rounded-xl shadow-md hover:opacity-90"
              >
                <Search size={16} />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield size={16} className="text-primary" />
                </div>
                <span className="whitespace-nowrap">FDA Approved</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Truck size={16} className="text-primary" />
                </div>
                <span className="whitespace-nowrap">Free Shipping $50+</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Heart size={16} className="text-primary" />
                </div>
                <span className="whitespace-nowrap">100% Authentic</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="ght-gradient text-white shadow-lg hover:opacity-90 rounded-xl px-6 sm:px-8 py-6 h-auto"
              >
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl px-6 sm:px-8 py-6 h-auto border-primary/30 text-primary hover:bg-primary/5"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Product Showcase */}
          <div className="relative lg:pl-8">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 rounded-full blur-2xl opacity-50" />

            {/* Main Image Area */}
            <div className="relative z-10">
              {/* Featured Product Cards Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {featuredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className={`group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden ${
                      index === 0 ? "lg:-translate-y-4" : ""
                    } ${index === 3 ? "lg:translate-y-4" : ""}`}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="aspect-square bg-linear-to-br from-primary/5 to-secondary/10 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] sm:text-xs text-primary font-medium">
                          {product.category}
                        </p>
                        <h4 className="font-semibold text-foreground text-[13px] sm:text-sm truncate">
                          {product.name}
                        </h4>
                        <p className="text-primary font-bold text-sm">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Stats Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card shadow-xl rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4 sm:gap-8 border border-border/50 min-w-[280px] justify-center">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    10K+
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                    Products
                  </p>
                </div>
                <div className="w-px h-8 sm:h-10 bg-border" />
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    50K+
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                    Customers
                  </p>
                </div>
                <div className="w-px h-8 sm:h-10 bg-border" />
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    4.9
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                    Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
