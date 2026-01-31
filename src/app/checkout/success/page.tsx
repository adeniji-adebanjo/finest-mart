"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Home,
  ShoppingBag,
  Download,
  Calendar,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Suspense } from "react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId =
    searchParams.get("id") ||
    `GHT-${Math.floor(100000 + Math.random() * 900000)}`;
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-ght-success/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-white rounded-full p-4 shadow-xl border-4 border-ght-success/10">
            <CheckCircle2 size={64} className="text-ght-success" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-foreground mb-4">
          Order Received!
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
          Thank you for choosing GHT. Your order has been placed and is being
          prepared for shipment.
        </p>

        {/* Order Info Card */}
        <Card className="border-border/50 shadow-2xl mb-12 overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="bg-primary/5 border-b border-border/50 py-4">
            <CardTitle className="text-sm uppercase tracking-widest text-primary font-bold">
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-border/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Hash size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">
                    Order ID
                  </p>
                  <p className="font-bold text-foreground">{orderId}</p>
                </div>
              </div>
              <div className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">
                    Date
                  </p>
                  <p className="font-bold text-foreground">{date}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-lg text-left hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
              <Package size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Preparing shipment</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We&apos;re currently gathering your health items. You&apos;ll
              receive an email once they ship.
            </p>
          </div>
          <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-lg text-left hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
              <Truck size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Track delivery</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time tracking will be available in your dashboard order
              history.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="ght-gradient text-white shadow-xl rounded-2xl h-14 px-8 w-full sm:w-auto"
          >
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-2xl h-14 px-8 border-primary/20 text-primary hover:bg-primary/5 w-full sm:w-auto"
          >
            <Link href="/products">
              <ShoppingBag size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Support */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Any questions?{" "}
            <Link
              href="/contact"
              className="text-primary font-bold hover:underline"
            >
              Contact our support team
            </Link>{" "}
            or download your{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-bold text-primary"
            >
              <Download size={14} className="mr-1" />
              invoice
            </Button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
