"use client";

import React from "react";
import { useCart } from "../providers";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function Cart() {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <ShoppingBag className="mr-3" />
          Your Cart
        </h1>

        <Card className="min-h-[400px] flex items-center justify-center">
          <CardContent className="w-full">
            {cartCount === 0 ? (
              <div className="flex flex-col items-center py-10">
                <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6 text-muted-foreground">
                  <ShoppingBag size={40} />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button
                  asChild
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full px-8 py-6 shadow-md"
                >
                  <Link href="/">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="text-left w-full p-6">
                <p className="text-lg mb-4 text-foreground">
                  You have <span className="font-bold">{cartCount}</span> items
                  in your cart.
                </p>
                <div className="border-t border-border pt-8 mt-8">
                  <p className="text-muted-foreground italic">
                    Cart details implementation coming soon...
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
