"use client";

import React from "react";
import { useCart } from "../providers";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <ShoppingBag className="mr-3" />
          Your Cart
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center py-20">
          {cartCount === 0 ? (
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                <ShoppingBag size={40} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                href="/"
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-bold transition-colors shadow-md"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="text-left">
              <p className="text-lg mb-4">
                You have <span className="font-bold">{cartCount}</span> items in
                your cart.
              </p>
              <div className="border-t border-gray-100 pt-8 mt-8">
                <p className="text-gray-400 italic">
                  Cart details implementation coming soon...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
