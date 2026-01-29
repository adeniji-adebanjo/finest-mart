"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Grid, List, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products, categories } from "@/data/products";
import { ProductFilters as IProductFilters, ProductCategory } from "@/types";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const categoryName =
    categories.find((c) => c.id === categoryId)?.name || categoryId;

  const [filters, setFilters] = useState<IProductFilters>({
    category: categoryId as ProductCategory,
  });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Must match category
        if (p.category !== categoryId) return false;

        // Other filters
        if (
          filters.search &&
          !p.name.toLowerCase().includes(filters.search.toLowerCase())
        )
          return false;
        if (filters.minPrice && p.price < filters.minPrice) return false;
        if (filters.maxPrice && p.price > filters.maxPrice) return false;
        if (filters.inStock && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [filters, categoryId]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 py-12 lg:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/products"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              <ArrowLeft size={14} /> All Products
            </Link>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-foreground mb-4 uppercase">
            {categoryName} <span className="ght-text-gradient">Collection</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse our curated selection of high-quality products in the{" "}
            {categoryName} category.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <ProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowMobileFilters(true)}
                  variant="outline"
                  className="lg:hidden rounded-xl h-10 px-4"
                >
                  <SlidersHorizontal size={18} className="mr-2" /> Filters
                </Button>
                <div className="text-sm font-medium text-muted-foreground">
                  Showing{" "}
                  <span className="text-primary font-bold">
                    {filteredProducts.length}
                  </span>{" "}
                  results
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center bg-muted p-1 rounded-xl">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 rounded-lg transition-all ${view === "grid" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 rounded-lg transition-all ${view === "list" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
            <ProductGrid products={filteredProducts} view={view} />
          </div>
        </div>
      </div>
    </div>
  );
}
