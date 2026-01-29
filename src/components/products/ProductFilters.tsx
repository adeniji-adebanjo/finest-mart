"use client";

import React from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCategory, ProductFilters as IProductFilters } from "@/types";
import { categories } from "@/data/products";

interface ProductFiltersProps {
  filters: IProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<IProductFilters>>;
}

export const ProductFilters = ({
  filters,
  setFilters,
}: ProductFiltersProps) => {
  const handleCategoryChange = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? undefined : (cat as ProductCategory),
    }));
  };

  const handlePriceChange = (min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({ ...prev, sortBy: sort as any }));
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="space-y-3">
        <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
          Search
        </h4>
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={filters.search || ""}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="pl-10 rounded-xl"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
          Categories
        </h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                filters.category === cat.id
                  ? "bg-primary/10 text-primary font-bold shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filters.category === cat.id
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
          Price Range
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: parseInt(e.target.value) || undefined,
              }))
            }
            className="h-9 text-xs rounded-lg"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: parseInt(e.target.value) || undefined,
              }))
            }
            className="h-9 text-xs rounded-lg"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
          Status
        </h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="rounded border-border text-primary focus:ring-primary h-4 w-4"
              checked={filters.inStock || false}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, inStock: e.target.checked }))
              }
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              In Stock Only
            </span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full text-xs rounded-xl"
        onClick={() => setFilters({})}
      >
        <X size={14} className="mr-2" />
        Clear All Filters
      </Button>
    </div>
  );
};
