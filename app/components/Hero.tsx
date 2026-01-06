"use client";

import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useCart } from "../providers";

// Helper component for Hero Cards
const HeroCard = ({ onAddToCart }: { onAddToCart: (item: any) => void }) => {
  return (
    <div className="relative group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center">
      {/* Mock content replicating legacy HeroCard */}
      <div className="h-20 w-20 bg-gray-100 rounded-full mb-3 overflow-hidden">
        {/* Use a placeholder image or convert legacy images */}
        <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-600 text-xs">
          Fresh
        </div>
      </div>
      <h4 className="text-sm font-bold text-gray-800">Spinach</h4>
      <p className="text-xs text-gray-500 mb-2">$12.99</p>
      <button
        onClick={() => onAddToCart({ name: "Spinach", price: 12.99 })}
        className="w-full py-1.5 px-3 bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-bold rounded-full transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

const Hero = () => {
  const { addToCart } = useCart();

  return (
    <section className="relative px-6 py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-4 flex flex-col space-y-6 z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Let your <span className="text-yellow-500">groceries</span> come to
            you
          </h1>
          <p className="text-lg text-gray-600">
            Get fresh groceries online without stepping out to make delicious
            food with the freshest ingredients.
          </p>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search here... e.g. groceries, vegetables"
              className="w-full pl-5 pr-12 py-4 rounded-full border-none shadow-lg bg-white focus:ring-2 focus:ring-yellow-400 transition-all outline-none text-gray-700"
            />
            <button className="absolute right-2 top-2 p-2 bg-gray-100 hover:bg-yellow-400 hover:text-white rounded-full transition-colors text-gray-500">
              <Search size={20} />
            </button>
          </div>

          <ul className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 mt-2">
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

        {/* Center Image */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px]">
            {/* Abstract Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 bg-red-300 rounded-full blur-3xl translate-x-10"></div>

            {/* Main Image - Using a placeholder or remote URL if feasible via config */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* 
                        Use standard img tag for now if remote pattern not set for all domains 
                        or use the cloudinary url from legacy code
                     */}
              <img
                src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948865/FinestMart/delivery-man_c4rwd4.png"
                alt="Delivery Man"
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
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
