"use client";

import React, { useEffect } from "react";
import { useAuth } from "../providers";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { isLoggedIn, username } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we are sure we are not logged in (and mounted)
    // In a real app, middleware is better for this.
    const storedUser = localStorage.getItem("user");
    if (!storedUser && !isLoggedIn) {
      // Simple client-side protection
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Dashboard
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Hello, {username}!</h2>
          <p className="text-gray-600 mb-4">
            Welcome to your Finest Mart dashboard. Here you can manage your
            orders and account settings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Recent Orders</h3>
              <p className="text-blue-600 text-sm">No recent orders found.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-2">Account Details</h3>
              <p className="text-green-600 text-sm">Manage your profile.</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-100">
              <h3 className="font-bold text-yellow-800 mb-2">Saved Items</h3>
              <p className="text-yellow-600 text-sm">View your wishlist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
