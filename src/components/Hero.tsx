"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useCart } from "../app/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Helper component for Hero Cards
const HeroCard = ({ onAddToCart }: { onAddToCart: (item: any) => void }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border">
      <CardContent className="flex flex-col items-center p-3">
        <div className="h-20 w-20 bg-muted rounded-full mb-3 overflow-hidden relative">
          {/* Placeholder - Replace with actual product images */}
          {/* <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-semibold">
            Fresh
          </div> */}
          {/* If you have the spinach.png in public/images/, uncomment below: */}
          <Image
            src="/images/spinach.png"
            alt="Spinach"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <h4 className="text-sm font-bold text-foreground">Fresh Spinach</h4>
        <p className="text-xs text-muted-foreground mb-2">$12.99</p>
        <Button
          onClick={() => onAddToCart({ name: "Fresh Spinach", price: 12.99 })}
          size="sm"
          className="w-full h-8 text-xs font-bold rounded-full bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const Hero = () => {
  const { addToCart } = useCart();

  return (
    <section className="relative px-6 py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-blue-50/50 to-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-4 flex flex-col space-y-6 z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Let your <span className="text-yellow-500">groceries</span> come to
            you
          </h1>
          <p className="text-lg text-muted-foreground">
            Get fresh groceries online without stepping out to make delicious
            food with the freshest ingredients.
          </p>

          <div className="relative w-full max-w-md flex items-center">
            <Input
              type="text"
              placeholder="Search here... e.g. groceries, vegetables"
              className="pl-5 pr-12 py-6 rounded-full shadow-lg border-none focus-visible:ring-yellow-400 text-base"
            />
            <Button
              size="icon"
              className="absolute right-2 h-10 w-10 bg-muted hover:bg-yellow-400 hover:text-white rounded-full text-muted-foreground"
            >
              <Search size={20} />
            </Button>
          </div>

          <ul className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground mt-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Fresh Vegetables
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              100% Delivery
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Cash on Delivery
            </li>
          </ul>
        </div>

        {/* Center Image - Optimized with Next.js Image */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px]">
            {/* Abstract Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 bg-red-300 rounded-full blur-3xl translate-x-10"></div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948865/FinestMart/delivery-man_c4rwd4.png"
                alt="Delivery Man"
                width={450}
                height={450}
                priority
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-4">
          <HeroCard onAddToCart={addToCart} />
          <HeroCard onAddToCart={addToCart} />
          <HeroCard onAddToCart={addToCart} />
          <HeroCard onAddToCart={addToCart} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
