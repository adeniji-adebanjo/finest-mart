"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
              Assurance & Satisfaction
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4">
            Returns & <span className="ght-text-gradient">Refunds</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Not completely satisfied? We've made our return process as simple as
            possible. Your wellness is our primary concern.
          </p>
        </div>

        {/* 30 Day Guarantee */}
        <div className="bg-white p-10 lg:p-16 rounded-[4rem] border border-border/50 shadow-2xl mb-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
            <RotateCcw size={200} className="-rotate-12" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <RotateCcw size={40} className="text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-black text-foreground mb-4">
                30-Day Happiness Guarantee
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Most items purchased from GHT Health can be returned within 30
                days of delivery for a full refund or exchange, provided they
                are in their original condition and packaging.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  className="ght-gradient text-white rounded-2xl h-14 px-8 shadow-lg"
                >
                  <Link href="/contact">Start a Return</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl h-14 px-8 border-border/50 hover:bg-primary/5 transition-all"
                >
                  View Eligibility
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-border/50 shadow-lg rounded-[3rem] overflow-hidden">
            <CardHeader className="bg-ght-success/10 border-b border-ght-success/20">
              <CardTitle className="flex items-center gap-3 text-lg text-ght-success">
                <CheckCircle2 size={22} />
                Easy to Return
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-ght-success/20 flex items-center justify-center shrink-0 text-ght-success font-bold text-xs mt-0.5">
                    1
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Unopened supplements and vitamins.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-ght-success/20 flex items-center justify-center shrink-0 text-ght-success font-bold text-xs mt-0.5">
                    2
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Non-personalized medical equipment (unused).
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-ght-success/20 flex items-center justify-center shrink-0 text-ght-success font-bold text-xs mt-0.5">
                    3
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Personal care items with intact factory seals.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg rounded-[3rem] overflow-hidden">
            <CardHeader className="bg-destructive/5 border-b border-destructive/10">
              <CardTitle className="flex items-center gap-3 text-lg text-destructive">
                <ShieldAlert size={22} />
                Non-Returnable Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 text-destructive font-bold text-xs mt-0.5">
                    !
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Opened or used medical diagnostic tools.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 text-destructive font-bold text-xs mt-0.5">
                    !
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perishable health foods or customized supplements.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 text-destructive font-bold text-xs mt-0.5">
                    !
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Items marked as "Final Sale" on the product page.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* FAQs Section Preview */}
        <div className="text-center mb-16">
          <HelpCircle size={48} className="text-primary/20 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-foreground mb-4">
            Refund Questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Check our most common refund and return inquiries.
          </p>
          <Button
            asChild
            variant="link"
            className="text-primary font-black text-lg group"
          >
            <Link href="/faq" className="flex items-center gap-2">
              Visit FAQ Center
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>
          </Button>
        </div>

        {/* Support Banner */}
        <div className="bg-secondary/20 rounded-[3rem] p-10 border border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="font-bold text-foreground">
                Need specialized help?
              </p>
              <p className="text-sm text-muted-foreground">
                Our returns team is available for real-time consultation.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl h-14 px-8 border-primary/20 text-primary hover:bg-primary/5"
          >
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
