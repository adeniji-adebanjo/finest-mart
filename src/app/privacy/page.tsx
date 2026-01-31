"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Eye, Database, Globe, Clock, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "January 30, 2026";

  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ght-success/10 rounded-full mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ght-success">
              Security & Trust
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-4">
            Privacy <span className="ght-text-gradient">Policy</span>
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2 font-medium">
            <Clock size={16} /> Last updated: {lastUpdated}
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-[2rem] border border-border/50 text-center shadow-xl shadow-primary/5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-4">
              <Lock size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-2">Secure</h3>
            <p className="text-xs text-muted-foreground">
              Full data encryption for all transactions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-border/50 text-center shadow-xl shadow-primary/5">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center mx-auto mb-4">
              <Eye size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-2">Transparent</h3>
            <p className="text-xs text-muted-foreground">
              Clear communication on how data is used.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-border/50 text-center shadow-xl shadow-primary/5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mx-auto mb-4">
              <Globe size={24} />
            </div>
            <h3 className="font-bold text-foreground mb-2">Control</h3>
            <p className="text-xs text-muted-foreground">
              You decide what data you share with us.
            </p>
          </div>
        </div>

        {/* Content Card */}
        <Card className="border-border/50 shadow-2xl rounded-[3rem] overflow-hidden">
          <CardContent className="p-8 sm:p-12 lg:p-16 prose prose-ght max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                <Database className="text-primary" size={24} />
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information to provide better services to all our
                users. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  password, and phone number when you register.
                </li>
                <li>
                  <strong>Transactional Data:</strong> Shipping address, billing
                  address, and payment confirmation (we do not store full credit
                  card numbers).
                </li>
                <li>
                  <strong>Health Preferences:</strong> Categories and products
                  you browse to personalize your experience.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                <ShieldCheck className="text-primary" size={24} />
                2. How We Use Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                GHT uses the information we collect for several purposes:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>To process and deliver your health and wellness orders.</li>
                <li>To send transactional emails and order updates.</li>
                <li>To provide customer support and respond to inquiries.</li>
                <li>
                  To improve our website functionality and product selection.
                </li>
                <li>To detect and prevent fraudulent transactions.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6">
                3. Data Sharing & Third Parties
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal information to third parties. We
                only share data with service providers necessary for our
                operations, such as:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-sm italic">
                <li>Shipping carriers (UPS, FedEx, DHL) for delivery.</li>
                <li>Payment processors (Stripe, PayPal) for secure billing.</li>
                <li>
                  Cloud infrastructure providers (Google Firebase) for website
                  hosting.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-foreground mb-6">
                4. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal
                information at any time via your account dashboard. You may also
                opt-out of marketing communications by clicking "unsubscribe" in
                any email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-foreground mb-6">
                5. HIPAA Compliance Note
              </h2>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <p className="text-sm text-primary font-medium italic leading-relaxed">
                  While GHT is a wellness store and not a primary healthcare
                  provider, we adhere to high standards of data security
                  reflecting HIPAA-level protection for any health-related data
                  you share during inquiries or consultations.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Concerned about your data?{" "}
            <a
              href="/contact"
              className="text-primary font-bold hover:underline"
            >
              Speak with our Privacy Officer
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
