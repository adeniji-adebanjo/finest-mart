import React from "react";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const ProductPrice = ({
  price,
  originalPrice,
  className,
  size = "md",
}: ProductPriceProps) => {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl sm:text-4xl",
  };

  const discountSizeStyles = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-lg",
  };

  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-black text-primary", sizeStyles[size])}>
        ${price.toFixed(2)}
      </span>
      {originalPrice && (
        <>
          <span
            className={cn(
              "text-muted-foreground line-through font-medium",
              discountSizeStyles[size],
            )}
          >
            ${originalPrice.toFixed(2)}
          </span>
          {size !== "sm" && (
            <span
              className={cn(
                "font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-md",
                discountSizeStyles[size],
              )}
            >
              {discount}% OFF
            </span>
          )}
        </>
      )}
    </div>
  );
};
