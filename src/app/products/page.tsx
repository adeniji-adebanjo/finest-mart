"use client";

import React, { useState, useMemo } from "react";
import {
  Grid,
  List,
  ChevronDown,
  SlidersHorizontal,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";
import { ProductFilters as IProductFilters } from "@/types";
import Link from "next/link";

export default function ProductsPage() {
  const [filters, setFilters] = useState<IProductFilters>({});
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        if (
          filters.search &&
          !p.name.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }
        // Category filter
        if (filters.category && p.category !== filters.category) {
          return false;
        }
        // Price filter
        if (filters.minPrice && p.price < filters.minPrice) {
          return false;
        }
        if (filters.maxPrice && p.price > filters.maxPrice) {
          return false;
        }
        // Brand filter
        if (
          filters.brands &&
          filters.brands.length > 0 &&
          (!p.brand || !filters.brands.includes(p.brand))
        ) {
          return false;
        }
        // Status filter
        if (filters.inStock && !p.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating")
          return (b.rating || 0) - (a.rating || 0);
        if (filters.sortBy === "newest") return a.isNew ? -1 : 1;
        return 0;
      });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 py-12 lg:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-foreground mb-4">
            Our <span className="ght-text-gradient">Collections</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our range of healthcare products from vitamins and
            supplements to professional-grade medical equipment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <ProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-card p-3 sm:p-4 rounded-2xl border border-border/50 shadow-sm">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowMobileFilters(true)}
                  variant="outline"
                  className="lg:hidden rounded-xl h-10 px-4"
                >
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filters
                </Button>
                <div className="text-sm font-medium text-muted-foreground">
                  Showing{" "}
                  <span className="text-primary font-bold">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* View Switcher */}
                <div className="hidden sm:flex items-center bg-muted p-1 rounded-xl">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 rounded-lg transition-all ${
                      view === "grid"
                        ? "bg-white shadow-sm text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 rounded-lg transition-all ${
                      view === "list"
                        ? "bg-white shadow-sm text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative group">
                  <select
                    value={filters.sortBy || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value as any,
                      }))
                    }
                    className="appearance-none bg-background border border-border rounded-xl h-10 pl-4 pr-10 text-sm font-medium focus:ring-primary focus:border-primary outline-none cursor-pointer"
                  >
                    <option value="">Sort by: Features</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">New Arrivals</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Grid */}
            <ProductGrid products={filteredProducts} view={view} />
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[280px] bg-background shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-bold text-lg">Filters</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowMobileFilters(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
              <ProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const X = ({
  size,
  ...props
}: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
