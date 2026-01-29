"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, Heart, Plus, Minus, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductBadge } from "./ProductBadge";
import { ProductRating } from "./ProductRating";
import { ProductPrice } from "./ProductPrice";
import { useCart, useWishlist } from "@/app/providers";

interface ProductQuickViewProps {
  product: Product;
  trigger?: React.ReactNode;
}

export const ProductQuickView = ({
  product,
  trigger,
}: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 shadow-lg rounded-full h-8 w-8 text-primary"
          >
            <Eye size={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden sm:rounded-[32px] border-none shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="relative aspect-square bg-linear-to-br from-primary/5 to-secondary/10 flex items-center justify-center p-12">
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.isNew && <ProductBadge type="new" size="md" />}
              {product.originalPrice && <ProductBadge type="sale" size="md" />}
            </div>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Right: Info */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-2">
              <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <DialogTitle className="text-2xl sm:text-3xl font-black text-foreground mb-4">
                {product.name}
              </DialogTitle>
            </div>

            <ProductRating
              rating={product.rating || 0}
              reviewCount={product.reviewCount}
              className="mb-6"
            />

            <ProductPrice
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
              className="mb-6"
            />

            <p className="text-muted-foreground line-clamp-4 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-auto space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center bg-muted p-1 rounded-2xl border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={18} />
                  </Button>
                  <span className="w-10 text-center font-bold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus size={18} />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 rounded-2xl shadow-xl transition-all duration-300 ${
                    inCart
                      ? "bg-ght-success hover:bg-ght-success/90"
                      : "ght-gradient hover:opacity-90"
                  }`}
                >
                  {inCart ? "Add More" : "Add to Cart"}
                  <ShoppingBag size={18} className="ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-2xl transition-all",
                    isWishlisted
                      ? "text-destructive border-destructive/30 bg-destructive/5"
                      : "text-muted-foreground hover:text-destructive",
                  )}
                  onClick={handleWishlist}
                >
                  <Heart
                    size={20}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </Button>
              </div>

              <Button
                asChild
                variant="ghost"
                className="w-full text-primary font-bold hover:bg-primary/5 rounded-xl h-12"
              >
                <Link href={`/products/${product.category}/${product.slug}`}>
                  View Full Details
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
