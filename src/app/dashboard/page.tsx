"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useCart, useWishlist } from "../providers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  User,
  Heart,
  MapPin,
  Settings,
  ShoppingBag,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Quick stats data
const quickStats = [
  {
    label: "Total Orders",
    value: "12",
    icon: Package,
    color: "bg-blue-500",
    change: "+3 this month",
  },
  {
    label: "Wishlist Items",
    value: "8",
    icon: Heart,
    color: "bg-pink-500",
    change: "2 on sale",
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
    value: "3",
    icon: MapPin,
    color: "bg-green-500",
    change: "1 default",
  },
];

// Recent orders mock data
const recentOrders = [
  {
    id: "GHT-2024-001",
    date: "Jan 28, 2026",
    status: "Delivered",
    total: 89.99,
    items: 3,
  },
  {
    id: "GHT-2024-002",
    date: "Jan 25, 2026",
    status: "Shipped",
    total: 54.5,
    items: 2,
  },
  {
    id: "GHT-2024-003",
    date: "Jan 20, 2026",
    status: "Processing",
    total: 129.0,
    items: 5,
  },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Pending: "bg-gray-100 text-gray-700",
};

export default function Dashboard() {
  const { isLoggedIn, username } = useAuth();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const storedUser =
        typeof window !== "undefined" ? localStorage.getItem("ght_user") : null;
      if (!storedUser && !isLoggedIn) {
        router.push("/login");
      }
    }
  }, [mounted, isLoggedIn, router]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (
    !isLoggedIn &&
    typeof window !== "undefined" &&
    !localStorage.getItem("ght_user")
  ) {
    return null; // Redirecting...
  }

  // Get current time greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background py-8 lg:py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {greeting}, {username}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back to your GHT dashboard. Here's your health journey
              overview.
            </p>
          </div>
          <Button
            asChild
            className="ght-gradient text-white rounded-xl shadow-md"
          >
            <Link href="/products">
              <ShoppingBag size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="border-border/50 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.label === "Wishlist Items"
                          ? wishlistItems.length
                          : stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Track your latest purchases</CardDescription>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary"
                >
                  <Link href="/dashboard/orders">
                    View All
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {order.id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${order.total.toFixed(2)}
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/dashboard/orders"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Package size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">My Orders</p>
                    <p className="text-xs text-muted-foreground">
                      Track & manage orders
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <User size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">My Profile</p>
                    <p className="text-xs text-muted-foreground">
                      Edit personal info
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </Link>

                <Link
                  href="/dashboard/wishlist"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Heart size={20} className="text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Wishlist</p>
                    <p className="text-xs text-muted-foreground">
                      {wishlistItems.length} saved items
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </Link>

                <Link
                  href="/dashboard/addresses"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <MapPin size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Addresses</p>
                    <p className="text-xs text-muted-foreground">
                      Manage delivery addresses
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </Link>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Settings size={20} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Settings</p>
                    <p className="text-xs text-muted-foreground">
                      Account preferences
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
