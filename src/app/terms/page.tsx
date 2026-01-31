"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Gavel, Scale, AlertCircle } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "January 29, 2026";

  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Legal Documents
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4">
            Terms of <span className="ght-text-gradient">Service</span>
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2 font-medium">
            <Clock size={16} /> Last updated: {lastUpdated}
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          <Card className="bg-primary/5 border-primary/10 rounded-3xl">
            <CardContent className="p-6 flex items-start gap-4">
              <Scale className="text-primary shrink-0 mt-1" size={20} />
              <p className="text-sm text-foreground/80 leading-relaxed">
                We strive for total transparency in our medical supply and
                wellness distribution services.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-100 rounded-3xl">
            <CardContent className="p-6 flex items-start gap-4">
              <AlertCircle
                className="text-orange-500 shrink-0 mt-1"
                size={20}
              />
              <p className="text-sm text-foreground/80 leading-relaxed">
                By using GHT Health, you agree to comply with all local health
                regulations and medical guidelines.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Body Content */}
        <Card className="border-border/50 shadow-2xl rounded-[3rem] overflow-hidden">
          <CardContent className="p-8 sm:p-12 lg:p-16 prose prose-ght max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                <Gavel className="text-primary" size={24} />
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing and using ght-health.com (the "Website"), you agree
                to be bound by these Terms of Service. If you do not agree to
                all of these terms, please do not use this Website. GHT (General
                Health Treatment) reserves the right to modify these terms at
                any time.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                <Shield className="text-primary" size={24} />
                2. Medical Disclaimer
              </h2>
              <div className="bg-muted/50 p-6 rounded-2xl border border-border/50 mb-6">
                <p className="text-foreground font-bold mb-2">
                  IMPORTANT NOTICE:
                </p>
                <p className="text-sm text-muted-foreground italic">
                  The content on this Website is for informational purposes only
                  and is not intended as medical advice, diagnosis, or
                  treatment. Always seek the advice of your physician or other
                  qualified health provider with any questions you may have
                  regarding a medical condition.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                GHT does not recommend or endorse any specific tests,
                physicians, products, procedures, or opinions that may be
                mentioned on the Website. Reliance on any information provided
                by GHT is solely at your own risk.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6">
                3. Use of the Website
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>
                  You must be at least 18 years of age to use this Website.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account and password.
                </li>
                <li>
                  You agree not to use the Website for any unlawful purpose.
                </li>
                <li>
                  GHT reserves the right to terminate accounts that violate our
                  community guidelines.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6">
                4. Product Orders & Payment
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All prices are subject to change without notice. We reserve the
                right to refuse or cancel any order for any reason, including
                limitations on quantities available for purchase, inaccuracies
                in product or pricing information, or problems identified by our
                credit and fraud avoidance department.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Payment must be made in full at the time of purchase using the
                payment methods provided on the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-foreground mb-6">
                5. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GHT shall not be liable for any direct, indirect, incidental,
                special, or consequential damages resulting from the use or
                inability to use the Website or for the cost of procurement of
                substitute goods and services.
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Questions about our Terms?{" "}
            <a
              href="/contact"
              className="text-primary font-bold hover:underline"
            >
              Contact our legal team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
