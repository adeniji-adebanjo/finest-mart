"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Award,
  HeartPulse,
  Stethoscope,
  Microscope,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Products", value: "2,500+", icon: Award },
  { label: "Happy Customers", value: "50k+", icon: Users },
  { label: "Expert Doctors", value: "120+", icon: Stethoscope },
  { label: "Cities Served", value: "45+", icon: Truck },
];

const values = [
  {
    title: "Uncompromising Quality",
    description:
      "We source only the highest grade, certified health products and medical equipment from trusted global manufacturers.",
    icon: ShieldCheck,
  },
  {
    title: "Patient-First Approach",
    description:
      "Your health is our priority. We design every service and product selection with the user's wellness journey in mind.",
    icon: HeartPulse,
  },
  {
    title: "Scientific Integrity",
    description:
      "Every supplement and treatment in our store is vetted by medical professionals for efficacy and safety.",
    icon: Microscope,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-secondary/10">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                About GHT health
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl font-black text-foreground mb-8 leading-[1.1]"
            >
              Bridging the Gap Between{" "}
              <span className="ght-text-gradient">Luxury Wellness</span> & Real
              Healthcare
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mb-10"
            >
              GHT (General Health Treatment) was founded on a simple principle:
              high-quality healthcare and wellness essentials should be
              accessible, transparent, and aesthetically premium.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-10 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-8 rounded-[2rem] border border-border/50 shadow-xl shadow-primary/5 flex flex-col items-center text-center group hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <stat.icon size={24} />
                </div>
                <p className="text-3xl font-black text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary/20 rounded-[3rem] rotate-6" />
                <div className="absolute inset-0 bg-secondary/30 rounded-[3rem] -rotate-3" />
                <div className="relative h-full w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white flex items-center justify-center">
                  {/* Placeholder for real brand image */}
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 rounded-full ght-gradient mx-auto mb-6 flex items-center justify-center text-white font-black text-3xl">
                      G
                    </div>
                    <p className="font-bold text-foreground italic">
                      "Healing begins with quality care."
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-border/50 max-w-[200px] animate-bounce-soft">
                <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">
                  Established
                </p>
                <p className="text-2xl font-black text-foreground">2018</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-foreground mb-6">
                The GHT Journey
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  What started as a small medical supply distributor has evolved
                  into a comprehensive digital health ecosystem. We noticed that
                  patients often struggled to find genuine, certified
                  medications and high-end wellness gear in one place.
                </p>
                <p>
                  Today, GHT serves thousands of individuals and clinics across
                  the globe, providing everything from daily vitamins to
                  advanced diagnostic equipment.
                </p>
                <p className="font-bold text-primary italic">
                  We don't just sell products; we deliver peace of mind.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary/5 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black text-foreground mb-16">
            Values that Drive Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-border/30 group hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-primary rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">
                Ready to Prioritize Your Health?
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
                Join thousands of others who trust GHT for their daily wellness
                and medical needs. Quality is just a click away.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-2xl px-10 h-16 font-black text-xl shadow-xl"
                >
                  <Link href="/products">Shop Collection</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-10 h-16 font-bold text-xl"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Get in Touch
                    <ArrowRight size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
