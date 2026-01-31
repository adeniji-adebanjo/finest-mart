"use client";

import React from "react";
import { useAuth, useCart, useWishlist } from "../providers";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Quick stats data (Real values where possible)
const getStats = (wishlistCount: number) => [
  {
    label: "Items in Wishlist",
    value: wishlistCount.toString(),
    icon: Heart,
    color: "bg-pink-500",
    change: "Ready to order",
  },
  {
    label: "Reward Points",
    value: "2,450",
    icon: TrendingUp,
    color: "bg-amber-500",
    change: "Level: Gold",
  },
  {
    label: "Saved Addresses",
    value: "1",
    icon: MapPin,
    color: "bg-green-500",
    change: "Verified",
  },
  {
    label: "Total Orders",
    value: "0", // Will be updated when orders are fetched
    icon: Package,
    color: "bg-blue-500",
    change: "Just started",
  },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  pending: "bg-gray-100 text-gray-700",
};

export default function DashboardOverview() {
  const { username } = useAuth();
  const { wishlistItems } = useWishlist();

  const stats = getStats(wishlistItems.length);

  // Get current time greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground">
          {greeting}, <span className="ght-text-gradient">{username}</span>! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s a quick overview of your health journey and account
          activity.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.slice(0, 3).map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="border-border/50 hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
                <div className="flex items-start justify-between">
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest text-[10px]">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-black text-foreground mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-primary font-medium flex items-center gap-1">
                      <TrendingUp size={12} /> {stat.change}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg shadow-current/20 relative z-10`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Empty States / Recent Info */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 py-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Recent Activity
              </CardTitle>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary font-bold"
            >
              <Link href="/dashboard/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[240px]">
            <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center mb-4">
              <Package size={32} className="text-primary/40" />
            </div>
            <h3 className="font-bold text-lg mb-1">No Recent Orders</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              You haven&apos;t placed any orders yet. Start your wellness
              journey today!
            </p>
            <Button asChild className="ght-gradient text-white rounded-xl">
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 py-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart size={20} className="text-pink-500" />
                Wishlist Preview
              </CardTitle>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary font-bold"
            >
              <Link href="/dashboard/wishlist">Full Wishlist</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[240px]">
            {wishlistItems.length > 0 ? (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  You have {wishlistItems.length} items saved for later.
                </p>
                <div className="flex -space-x-4 mb-6">
                  {[1, 2, 3].slice(0, wishlistItems.length).map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden"
                    >
                      <Heart size={20} className="text-pink-200" />
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Link href="/dashboard/wishlist">View Wishlist</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-3xl bg-pink-50 flex items-center justify-center mb-4">
                  <Heart size={32} className="text-pink-200" />
                </div>
                <h3 className="font-bold text-lg mb-1">Wishlist is Empty</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                  Save items you love to find them easily later.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-pink-200 text-pink-500 hover:bg-pink-50"
                >
                  <Link href="/products">Find Inspiration</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
