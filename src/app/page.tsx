"use client";

import Hero from "../components/Hero";
import Link from "next/link";
import Image from "next/image";
import {
  Pill,
  Stethoscope,
  Sparkles,
  Baby,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Force dynamic rendering for pages using client-side state
export const dynamic = "force-dynamic";

// Category data
const categories = [
  {
    id: "supplements",
    name: "Supplements & Vitamins",
    description: "Essential nutrients for your daily health",
    icon: Pill,
    color: "from-emerald-500 to-teal-600",
    href: "/products/supplements",
  },
  {
    id: "equipment",
    name: "Medical Equipment",
    description: "Professional-grade health monitoring",
    icon: Stethoscope,
    color: "from-blue-500 to-indigo-600",
    href: "/products/equipment",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    description: "Premium skincare and body care",
    icon: Sparkles,
    color: "from-pink-500 to-rose-600",
    href: "/products/personal-care",
  },
  {
    id: "baby-family",
    name: "Baby & Family",
    description: "Gentle care for the whole family",
    icon: Baby,
    color: "from-amber-500 to-orange-600",
    href: "/products/baby-family",
  },
];

import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

// ... inside context
// Featured products selection
const featuredProducts = products
  .filter((p) => p.isBestSeller || p.originalPrice !== undefined)
  .slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-background" id="categories">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of health and wellness products
              designed to support your journey to better health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.id} href={category.href} className="group">
                  <Card className="h-full border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Handpicked essentials for your wellness journey
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-primary/30 text-primary hover:bg-primary/5"
            >
              <Link href="/products">
                View All
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 ght-gradient opacity-95" />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Start Your Health Journey Today
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust GHT for their health and
            wellness needs. Get exclusive discounts and health tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 shadow-lg"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8"
            >
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
