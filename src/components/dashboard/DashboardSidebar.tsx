"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  User,
  Heart,
  MapPin,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/providers";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: Package },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { logout, username } = useAuth();

  return (
    <div className="w-full lg:w-64 flex flex-col gap-2">
      {/* User Info Header */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl ght-gradient flex items-center justify-center text-white font-black text-lg shadow-lg">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-foreground truncate">{username}</p>
            <p className="text-xs text-muted-foreground">Standard Member</p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="bg-card border border-border/50 rounded-3xl p-3 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-primary",
              )}
            >
              <Icon
                size={20}
                className={cn(
                  "shrink-0",
                  isActive
                    ? "text-white"
                    : "text-muted-foreground group-hover:text-primary",
                )}
              />
              <span className="font-medium flex-1">{item.name}</span>
              <ChevronRight
                size={14}
                className={cn(
                  "opacity-0 transition-opacity",
                  isActive ? "opacity-100" : "group-hover:opacity-100",
                )}
              />
            </Link>
          );
        })}

        <div className="my-2 border-t border-border/50" />

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-destructive hover:bg-destructive/10 transition-all duration-300 text-left"
        >
          <LogOut size={20} className="shrink-0" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>

      {/* Help Card */}
      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 mt-4">
        <h4 className="font-bold text-primary mb-2">Need advice?</h4>
        <p className="text-xs text-primary/70 leading-relaxed mb-4">
          Speak with our certified health experts for personalized product
          recommendations.
        </p>
        <Button
          variant="link"
          className="p-0 h-auto text-primary font-bold text-xs"
        >
          Consult an expert →
        </Button>
      </div>
    </div>
  );
}

// Partial Button replacement inside sidebar since I can't import UI button easily here if it's in DashboardSidebar.
// Wait, I can just import it.
import { Button } from "@/components/ui/button";
