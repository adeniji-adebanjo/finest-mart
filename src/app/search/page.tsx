"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, List, Search as SearchIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [view, setView] = useState<"grid" | "list">("grid");

  const searchResults = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags?.some((t) => t.toLowerCase().includes(lowerQuery)),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-primary/5 py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/products"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Back to Catalog
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl lg:text-4xl font-black text-foreground mb-2">
                Search Results for{" "}
                <span className="ght-text-gradient">"{query}"</span>
              </h1>
              <p className="text-muted-foreground">
                Found {searchResults.length} products matching your criteria
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-muted p-1 rounded-xl">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded-lg transition-all ${
                    view === "grid"
                      ? "bg-white shadow-sm text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded-lg transition-all ${
                    view === "list"
                      ? "bg-white shadow-sm text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {searchResults.length > 0 ? (
          <ProductGrid products={searchResults} view={view} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
              <SearchIcon size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              We couldn't find anything matching "{query}". Try checking your
              spelling or using more general terms.
            </p>
            <Button asChild className="ght-gradient rounded-xl px-8 h-12">
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}

        {/* Suggested Categories */}
        {searchResults.length === 0 && (
          <div className="mt-12 pt-12 border-t border-border">
            <h3 className="text-lg font-bold mb-6">Popular Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Supplements", "Equipment", "Personal Care", "Wellness"].map(
                (cat) => (
                  <Link
                    key={cat}
                    href={`/products/${cat.toLowerCase().replace(/ /g, "-")}`}
                    className="p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-md transition-all text-center font-medium"
                  >
                    {cat}
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
