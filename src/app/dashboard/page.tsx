"use client";

import React, { useEffect } from "react";
import { useAuth } from "../providers";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const { isLoggedIn, username } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we are sure we are not logged in (and mounted)
    const storedUser = localStorage.getItem("user");
    if (!storedUser && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (
    !isLoggedIn &&
    typeof window !== "undefined" &&
    !localStorage.getItem("user")
  ) {
    return null; // Don't render if redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>

        <Card>
          <CardHeader>
            <CardTitle>Hello, {username}!</CardTitle>
            <CardDescription>
              Welcome to your Finest Mart dashboard. Here you can manage your
              orders and account settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-blue-50 border-blue-100 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-800">
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 text-sm">
                    No recent orders found.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-100 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-800">
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 text-sm">Manage your profile.</p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-100 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-yellow-800">
                    Saved Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-600 text-sm">View your wishlist.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
