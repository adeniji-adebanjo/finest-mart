"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductBadge } from "./ProductBadge";
import { ProductRating } from "./ProductRating";
import { ProductPrice } from "./ProductPrice";
import { ProductQuickView } from "./ProductQuickView";

export const ProductCard = ({ product, view = "grid" }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  if (view === "list") {
    return (
      <Card className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300">
        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="flex flex-col sm:flex-row"
        >
          <div className="relative w-full sm:w-48 aspect-square bg-linear-to-br from-primary/5 to-secondary/10 shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </div>
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  isWishlisted
                    ? "text-destructive bg-destructive/10"
                    : "text-muted-foreground bg-muted hover:text-destructive"
                }`}
              >
                <Heart
                  size={18}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {product.shortDescription || product.description}
            </p>

            <div className="flex items-center justify-between gap-4 mt-auto">
              <div className="flex flex-col">
                <ProductRating
                  rating={product.rating || 0}
                  reviewCount={product.reviewCount}
                  className="mb-2"
                />
                <ProductPrice
                  price={product.price}
                  originalPrice={product.originalPrice}
                />
              </div>

              <div className="flex items-center gap-2">
                <ProductQuickView product={product} />
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`rounded-xl shadow-lg transition-all duration-300 ${
                    inCart
                      ? "bg-ght-success hover:bg-ght-success/90"
                      : "ght-gradient hover:opacity-90"
                  }`}
                >
                  {inCart ? "In" : ""}{" "}
                  <ShoppingBag size={18} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col translate-on-hover">
      <Link
        href={`/products/${product.category}/${product.slug}`}
        className="flex-1 flex flex-col"
      >
        {/* Product Image */}
        <div className="relative aspect-square bg-linear-to-br from-primary/5 to-secondary/10 overflow-hidden shrink-0">
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && <ProductBadge type="new" />}
            {product.isBestSeller && <ProductBadge type="best-seller" />}
            {product.originalPrice && <ProductBadge type="sale" />}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
                isWishlisted
                  ? "bg-destructive text-white"
                  : "bg-white/90 text-muted-foreground hover:text-destructive"
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <ProductQuickView product={product} />
          </div>

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Product Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="mb-2">
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors text-sm sm:text-base">
              {product.name}
            </h3>
          </div>

          <ProductRating
            rating={product.rating || 0}
            reviewCount={product.reviewCount}
            className="mb-3"
          />

          <div className="mt-auto flex items-center justify-between gap-2">
            <ProductPrice
              price={product.price}
              originalPrice={product.originalPrice}
              size="sm"
            />

            <Button
              onClick={handleAddToCart}
              size="sm"
              disabled={!product.inStock}
              className={`rounded-xl shadow-md transition-all duration-300 h-9 px-3 ${
                inCart
                  ? "bg-ght-success hover:bg-ght-success/90"
                  : "ght-gradient hover:opacity-90"
              }`}
            >
              {inCart ? "In" : ""}{" "}
              <ShoppingBag size={16} className={inCart ? "ml-0" : "ml-0"} />
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
};
