"use client";

import React from "react";
import Link from "next/link";
import {
  Dna,
  Stethoscope,
  Sparkles,
  Baby,
  Activity,
  HeartPulse,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Supplements",
    slug: "supplements",
    description: "Daily vitamins and nutritional support.",
    icon: Dna,
    color: "from-blue-500/20 to-blue-600/20",
    textColor: "text-blue-600",
    itemCount: "120+ Products",
  },
  {
    name: "Equipment",
    slug: "equipment",
    description: "Medical tools and diagnostic devices.",
    icon: Stethoscope,
    color: "from-teal-500/20 to-teal-600/20",
    textColor: "text-teal-600",
    itemCount: "85+ Products",
  },
  {
    name: "Personal Care",
    slug: "personal-care",
    description: "Skincare and hygiene essentials.",
    icon: Sparkles,
    color: "from-purple-500/20 to-purple-600/20",
    textColor: "text-purple-600",
    itemCount: "210+ Products",
  },
  {
    name: "Wellness",
    slug: "wellness",
    description: "Holistic health and lifestyle items.",
    icon: Activity,
    color: "from-amber-500/20 to-amber-600/20",
    textColor: "text-amber-600",
    itemCount: "45+ Products",
  },
  {
    name: "Baby & Family",
    slug: "baby-family",
    description: "Care for your little ones and loved ones.",
    icon: Baby,
    color: "from-pink-500/20 to-pink-600/20",
    textColor: "text-pink-600",
    itemCount: "60+ Products",
  },
  {
    name: "First Aid",
    slug: "first-aid",
    description: "Emergency care and wound management.",
    icon: HeartPulse,
    color: "from-red-500/20 to-red-600/20",
    textColor: "text-red-600",
    itemCount: "35+ Products",
  },
];

const TrendingCategories = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                Discover
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-foreground mb-4"
            >
              Explore by <span className="ght-text-gradient">Categories</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Find exactly what you need for your wellness journey with our
              curated collections.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              asChild
              className="rounded-2xl border-primary/20 text-primary hover:bg-primary/5 px-8 h-12 font-bold"
            >
              <Link href="/products">View All Categories</Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="block h-full"
              >
                <div
                  className={`h-full p-8 rounded-[2.5rem] bg-linear-to-br ${category.color} border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 relative overflow-hidden`}
                >
                  {/* Background Icon Watermark */}
                  <category.icon
                    className={`absolute -right-8 -bottom-8 w-48 h-48 ${category.textColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center ${category.textColor} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
                    >
                      <category.icon size={28} />
                    </div>

                    <h3 className="text-2xl font-black text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-medium">
                      {category.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span
                        className={`text-xs font-black uppercase tracking-widest ${category.textColor}`}
                      >
                        {category.itemCount}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 ${category.textColor} bg-white shadow-lg`}
                      >
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories;

import { Button } from "@/components/ui/button";
