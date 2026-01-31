"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart, useWishlist } from "@/app/providers";
import { getProductBySlug, products } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductBadge } from "@/components/products/ProductBadge";
import { ProductRating } from "@/components/products/ProductRating";
import { ProductPrice } from "@/components/products/ProductPrice";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button asChild variant="outline">
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumbs & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-1.5 text-[10px] xs:text-xs sm:text-sm overflow-x-auto no-scrollbar whitespace-nowrap pb-1 sm:pb-0 order-2 sm:order-1 w-full sm:w-auto mt-2 sm:mt-0">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary shrink-0"
          >
            Home
          </Link>
          <span className="text-muted-foreground shrink-0">/</span>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-primary shrink-0"
          >
            Products
          </Link>
          <span className="text-muted-foreground shrink-0">/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="text-muted-foreground hover:text-primary capitalize shrink-0"
          >
            {product.category}
          </Link>
          <span className="text-muted-foreground shrink-0">/</span>
          <span className="font-bold text-foreground truncate max-w-[100px] xs:max-w-[150px] sm:max-w-none shrink-0">
            {product.name}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-primary h-7 px-0 sm:px-3 hover:bg-transparent sm:hover:bg-muted order-1 sm:order-2 text-xs sm:text-sm"
        >
          <ArrowLeft size={14} className="mr-1.5 sm:mr-2" /> Back
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-linear-to-br from-primary/5 to-secondary/10 rounded-3xl overflow-hidden shadow-sm border border-border/50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6 sm:p-12 transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${
                    isWishlisted
                      ? "bg-destructive text-white"
                      : "bg-white/90 text-muted-foreground hover:text-destructive"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-3 bg-white/90 text-muted-foreground rounded-full shadow-lg backdrop-blur-md hover:text-primary transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Image Thumbnails (if we have multiple) */}
            <div className="flex gap-4">
              {[product.image, ...([] as string[])].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-primary shadow-md"
                      : "border-transparent bg-muted/50"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                {product.isBestSeller && (
                  <ProductBadge type="best-seller" size="md" />
                )}
                {product.isNew && <ProductBadge type="new" size="md" />}
                {product.originalPrice && (
                  <ProductBadge type="sale" size="md" />
                )}
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <ProductRating
                  rating={product.rating || 0}
                  reviewCount={product.reviewCount}
                  size={18}
                />
                <div className="w-px h-4 bg-border" />
                <span className="text-sm text-ght-success font-bold flex items-center gap-1">
                  <Check size={16} /> In Stock
                </span>
              </div>

              <ProductPrice
                price={product.price}
                originalPrice={product.originalPrice}
                size="xl"
                className="mb-8"
              />

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.shortDescription || product.description}
              </p>

              {/* Purchase Actions */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center bg-muted p-1 rounded-2xl border border-border shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={18} />
                    </Button>
                    <span className="w-10 sm:w-12 text-center text-base sm:text-lg font-bold">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <Plus size={18} />
                    </Button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className={`h-12 sm:h-14 px-6 sm:px-12 rounded-2xl shadow-xl flex-1 sm:flex-none transition-all duration-300 text-sm sm:text-base ${
                      inCart
                        ? "bg-ght-success hover:bg-ght-success/90"
                        : "ght-gradient hover:opacity-90"
                    }`}
                  >
                    {inCart ? "Add More" : "Add to Cart"}
                    <ShoppingBag size={18} className="ml-2 sm:ml-3" />
                  </Button>
                </div>
              </div>
            </div>
            {/* Trust Badges */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold">Fast Shipping</p>
                  <p className="text-[10px] text-muted-foreground">
                    Free on orders $50+
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold">100% Genuine</p>
                  <p className="text-[10px] text-muted-foreground">
                    Quality Assured
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold">Easy Returns</p>
                  <p className="text-[10px] text-muted-foreground">
                    30-day money back
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Details, Reviews, FAQs */}
        <div className="mb-12 lg:mb-20">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-11 sm:h-14 p-0 overflow-x-auto no-scrollbar">
              <TabsTrigger
                value="details"
                className="relative h-11 sm:h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 sm:px-8 font-bold text-xs sm:text-sm"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="relative h-11 sm:h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 sm:px-8 font-bold text-xs sm:text-sm"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="relative h-11 sm:h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 sm:px-8 font-bold text-xs sm:text-sm"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="details"
              className="py-8 sm:py-12 prose prose-slate max-w-none"
            >
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">
                Product Overview
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
              <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-primary/5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl">
                  <h4 className="text-lg font-bold mb-4 text-primary">
                    Key Benefits
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Multi-nutrient formula for daily vitality
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Supported by clinical research
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                      Manufactured in FDA-registered facilities
                    </li>
                  </ul>
                </div>
                <div className="bg-secondary/10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl">
                  <h4 className="text-lg font-bold mb-4 text-primary">
                    How to Use
                  </h4>
                  <p className="text-muted-foreground">
                    Take one capsule daily with food, or as directed by your
                    healthcare professional. Do not exceed the recommended dose.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-8 sm:py-12">
              <div className="max-w-3xl space-y-0">
                {[
                  { label: "SKU", value: product.sku || "GHT-PROD-001" },
                  { label: "Category", value: product.category },
                  { label: "Brand", value: product.brand || "GHT Health" },
                  {
                    label: "Sub-category",
                    value: product.subcategory || "N/A",
                  },
                  { label: "Dimensions", value: "5 x 5 x 10 cm" },
                  { label: "Weight", value: "250g" },
                  { label: "Country of Origin", value: "United States" },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex flex-col xs:flex-row xs:justify-between py-3 sm:py-4 border-b border-border gap-1 xs:gap-4"
                  >
                    <span className="text-xs sm:font-medium text-muted-foreground">
                      {spec.label}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="reviews"
              className="py-12 text-center text-muted-foreground"
            >
              <p>
                Customer reviews coming soon. Be the first to review this
                product!
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-foreground">
              You May <span className="ght-text-gradient">Also Like</span>
            </h2>
            <Button asChild variant="ghost" className="text-primary font-bold">
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
