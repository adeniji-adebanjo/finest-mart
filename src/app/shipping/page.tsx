"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Globe,
  Clock,
  Package,
  ShieldCheck,
  MapPin,
} from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Logistics & Delivery
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4">
            Shipping <span className="ght-text-gradient">Information</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Fast, secure, and reliable delivery for your health essentials. We
            treat every package with the care it deserves.
          </p>
        </div>

        {/* Shipping Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[3rem] border border-border/50 shadow-xl shadow-primary/5 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Standard Delivery
            </h3>
            <p className="text-sm font-black text-primary mb-4">
              FREE over $50
            </p>
            <p className="text-sm text-muted-foreground">
              2-4 Business Days. Reliable ground shipping for all non-urgent
              essentials.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[3rem] border border-border/50 shadow-xl shadow-primary/5 flex flex-col items-center text-center group border-primary/20 bg-primary/5">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Express Shipping
            </h3>
            <p className="text-sm font-black text-primary mb-4">
              $12.99 Flat Rate
            </p>
            <p className="text-sm text-muted-foreground">
              1-2 Business Days. Priority handling for when you need your
              treatment fast.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[3rem] border border-border/50 shadow-xl shadow-primary/5 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Next Day Air
            </h3>
            <p className="text-sm font-black text-primary mb-4">
              $24.99 Flat Rate
            </p>
            <p className="text-sm text-muted-foreground">
              Guaranteed Next Day. Ultimate priority for critical medical
              equipment.
            </p>
          </div>
        </div>

        {/* Detailed Logic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-lg rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-muted/50 border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Globe className="text-primary" size={20} />
                Shipping Zones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Currently, GHT Health serves the entire{" "}
                <strong>United States</strong>, including Hawaii and Alaska.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">
                    Contiguous US: 2-4 days
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">
                    AK, HI & PR: 5-7 days
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border/50 grayscale opacity-70">
                  <Globe size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">
                    International: Coming Soon
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-muted/50 border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Package className="text-primary" size={20} />
                Packaging & Care
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every order is packed in{" "}
                <strong>certified medical-grade packaging</strong> to ensure
                stability and safety of supplements and sensitive gear.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck size={14} className="text-ght-success" />
                  Temperature Controlled buffers
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck size={14} className="text-ght-success" />
                  Tamper-evident seals
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck size={14} className="text-ght-success" />
                  Discreet packaging available
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Note */}
        <div className="mt-16 bg-white p-10 rounded-[3rem] border border-border/50 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Truck size={32} className="text-primary animate-pulse" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Real-time Order Tracking
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Once your order ships, you'll receive a tracking number via email
              and SMS. You can also monitor your package directly from your{" "}
              <strong>Dashboard</strong>.
            </p>
          </div>
          <Button
            asChild
            className="ght-gradient text-white rounded-2xl h-14 px-8 shadow-lg"
          >
            <a href="/dashboard/orders">Track Order</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
