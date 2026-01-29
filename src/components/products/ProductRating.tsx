import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: number;
  className?: string;
}

export const ProductRating = ({
  rating,
  reviewCount,
  showCount = true,
  size = 14,
  className,
}: ProductRatingProps) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              i < Math.floor(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-muted",
            )}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground font-medium">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
