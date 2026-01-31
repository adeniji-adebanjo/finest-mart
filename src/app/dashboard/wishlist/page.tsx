"use client";

import React, { useMemo } from "react";
import { useWishlist } from "@/app/providers";
import { products } from "@/data/products";
import { Heart, ShoppingBag, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlistItems.includes(p.id));
  }, [wishlistItems]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">
            My <span className="ght-text-gradient">Wishlist</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Items you&apos;ve saved for your future health needs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-muted-foreground mr-2">
            {wishlistedProducts.length} items
          </p>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-border/50"
          >
            <Filter size={16} className="mr-2" /> Sort
          </Button>
        </div>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="animate-in fade-in zoom-in-95 duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 border-dashed border-2 bg-transparent text-center p-12 lg:p-24">
          <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-pink-200" />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto mb-8">
            See something you like? Tap the heart icon to save it here for
            later.
          </p>
          <Button
            asChild
            className="ght-gradient text-white px-8 rounded-xl h-12 shadow-lg"
          >
            <Link href="/products">
              <ShoppingBag size={18} className="mr-2" />
              Start Shopping
            </Link>
          </Button>
        </Card>
      )}

      {/* Recommended Section */}
      {wishlistedProducts.length === 0 && (
        <div className="pt-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Search size={20} className="text-primary" />
            Suggested for you
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
