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

// Featured products mock data
const featuredProducts = [
  {
    id: "1",
    name: "Premium Multivitamin Complex",
    price: 34.99,
    originalPrice: 44.99,
    image: "/images/spinach.png",
    rating: 4.8,
    reviews: 256,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Omega-3 Fish Oil 1000mg",
    price: 29.99,
    image: "/images/Dairy.png",
    rating: 4.7,
    reviews: 189,
    badge: "New",
  },
  {
    id: "3",
    name: "Vitamin D3 + K2 Formula",
    price: 24.99,
    image: "/images/Baby food.png",
    rating: 4.9,
    reviews: 342,
  },
  {
    id: "4",
    name: "Probiotic 50 Billion CFU",
    price: 39.99,
    originalPrice: 49.99,
    image: "/images/Condiments.png",
    rating: 4.6,
    reviews: 178,
    badge: "Sale",
  },
];

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
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
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
              <Card
                key={product.id}
                className="group border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden">
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full z-10 ${
                          product.badge === "Sale"
                            ? "bg-destructive text-white"
                            : product.badge === "New"
                              ? "bg-primary text-white"
                              : "bg-amber-500 text-white"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white">
                      <Heart
                        size={18}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      />
                    </button>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-400"
                                : "text-gray-200"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
