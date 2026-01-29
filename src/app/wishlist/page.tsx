"use client";

import React from "react";
import { useWishlist } from "@/app/providers";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  // Filter products that are in the wishlist
  // Note: specific product lookups might be faster with a map if the list is huge,
  // but for a typical wishlist this is fine.
  const wishlistProducts = products.filter((p) => wishlistItems.includes(p.id));

  return (
    <div className="min-h-screen py-12 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <span className="p-3 bg-primary/10 rounded-full text-primary">
                <Heart size={32} fill="currentColor" />
              </span>
              My Wishlist
            </h1>
            <p className="text-muted-foreground mt-2 ml-1">
              {wishlistProducts.length} items saved for later
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed text-center shadow-xs">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-foreground">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Looks like you haven't added anything to your wishlist yet.
              Explore our products and find something you love!
            </p>
            <Button
              size="lg"
              className="ght-gradient rounded-full shadow-lg hover:opacity-90 transition-opacity"
              asChild
            >
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Browsing
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
