import React from "react";
import { cn } from "@/lib/utils";

interface ProductBadgeProps {
  type: "new" | "sale" | "best-seller" | "out-of-stock";
  className?: string;
  size?: "sm" | "md";
}

export const ProductBadge = ({
  type,
  className,
  size = "sm",
}: ProductBadgeProps) => {
  const styles = {
    new: "bg-primary text-white",
    sale: "bg-destructive text-white",
    "best-seller": "bg-amber-500 text-white",
    "out-of-stock": "bg-muted text-muted-foreground",
  };

  const labels = {
    new: "NEW",
    sale: "SALE",
    "best-seller": "BEST SELLER",
    "out-of-stock": "OUT OF STOCK",
  };

  return (
    <span
      className={cn(
        "font-bold uppercase tracking-wider rounded-lg shadow-sm px-2.5 py-1 z-10",
        size === "sm" ? "text-[10px]" : "text-xs px-3 py-1.5",
        styles[type],
        className,
      )}
    >
      {labels[type]}
    </span>
  );
};
