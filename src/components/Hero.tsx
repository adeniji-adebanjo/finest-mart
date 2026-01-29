"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Shield, Truck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Mock featured products for hero section
const featuredProducts = [
  {
    id: "1",
    name: "Vitamin D3",
    price: 24.99,
    image: "/images/spinach.png",
    category: "Vitamins",
  },
  {
    id: "2",
    name: "Omega-3 Fish Oil",
    price: 29.99,
    image: "/images/Dairy.png",
    category: "Supplements",
  },
  {
    id: "3",
    name: "Multivitamin Plus",
    price: 34.99,
    image: "/images/Baby food.png",
    category: "Vitamins",
  },
  {
    id: "4",
    name: "Probiotics",
    price: 39.99,
    image: "/images/Condiments.png",
    category: "Digestive",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 ght-gradient-subtle" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Health,{" "}
                <span className="ght-text-gradient">Our Priority</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover premium health products, supplements, and wellness
                essentials. Quality healthcare delivered right to your doorstep
                with care.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Search vitamins, supplements, equipment..."
                className="pl-5 pr-14 py-6 rounded-2xl shadow-lg border-border/50 bg-card focus-visible:ring-primary text-base"
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 ght-gradient text-white rounded-xl shadow-md hover:opacity-90"
              >
                <Search size={18} />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield size={16} className="text-primary" />
                </div>
                <span>FDA Approved</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck size={16} className="text-primary" />
                </div>
                <span>Free Shipping $50+</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart size={16} className="text-primary" />
                </div>
                <span>100% Authentic</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="ght-gradient text-white shadow-lg hover:opacity-90 rounded-xl px-8"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl px-8 border-primary/30 text-primary hover:bg-primary/5"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Product Showcase */}
          <div className="relative lg:pl-8">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 rounded-full blur-2xl" />

            {/* Main Image Area */}
            <div className="relative z-10">
              {/* Featured Product Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className={`group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden ${
                      index === 0 ? "lg:-translate-y-4" : ""
                    } ${index === 3 ? "lg:translate-y-4" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-primary font-medium">
                          {product.category}
                        </p>
                        <h4 className="font-semibold text-foreground text-sm truncate">
                          {product.name}
                        </h4>
                        <p className="text-primary font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Stats Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card shadow-xl rounded-2xl px-6 py-4 flex items-center gap-8 border border-border/50">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">10K+</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">50K+</p>
                  <p className="text-xs text-muted-foreground">Customers</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">4.9</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
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
