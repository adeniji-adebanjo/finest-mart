"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  User,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    id: "orders",
    label: "Ordering",
    icon: ShoppingBag,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: Truck,
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    id: "returns",
    label: "Returns",
    icon: RotateCcw,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: "account",
    label: "Account",
    icon: User,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
    color: "text-ght-success",
    bg: "bg-ght-success/10",
  },
];

const faqs = [
  {
    category: "orders",
    question: "How do I place an order on GHT Health?",
    answer:
      "Simply browse our collection, add items to your cart, and proceed to checkout. You can checkout as a guest or create an account for faster shopping next time.",
  },
  {
    category: "orders",
    question: "Can I modify or cancel my order after it's placed?",
    answer:
      "We process orders quickly, but if you contact us within 30 minutes of placing your order, we can usually make changes or cancel it. Email support@ght-health.com immediately.",
  },
  {
    category: "shipping",
    question: "What are your shipping rates and delivery times?",
    answer:
      "Standard shipping is FREE on orders over $50. For orders under $50, a flat rate of $5.99 applies. Standard delivery takes 2-4 business days. Express shipping options are available at checkout.",
  },
  {
    category: "shipping",
    question: "Do you offer international shipping?",
    answer:
      "Currently, we ship within the United States. We are working on expanding our logistics to serve international health enthusiasts soon!",
  },
  {
    category: "returns",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most unopened items. For hygiene reasons, certain medical equipment and personal care items cannot be returned once opened. Please see our full return policy for details.",
  },
  {
    category: "returns",
    question: "How long does it take to process a refund?",
    answer:
      "Once we receive your returned item, we process the refund within 3-5 business days. The funds will appear back on your original payment method depending on your bank's processing time.",
  },
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. All transactions are encrypted and secure.",
  },
  {
    category: "account",
    question: "Do I need an account to shop at GHT?",
    answer:
      "No, you can checkout as a guest. However, having an account allows you to track orders, save favorite products to your wishlist, and manage multiple shipping addresses.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="bg-secondary/10 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Support Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-8">
            How can we <span className="ght-text-gradient">help you?</span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-x-0 bottom-0 top-0 bg-white rounded-3xl shadow-2xl group-focus-within:ring-4 ring-primary/10 transition-all" />
            <div className="relative">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                size={24}
              />
              <Input
                placeholder="Search questions or keywords..."
                className="h-16 pl-16 pr-6 bg-transparent border-none text-lg rounded-3xl focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 space-y-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 ml-2">
                Categories
              </h3>
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeCategory === "all"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-muted-foreground hover:bg-primary/5 hover:text-primary border border-border/50"
                }`}
              >
                <HelpCircle size={20} />
                All Questions
              </button>
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white text-muted-foreground hover:bg-primary/5 hover:text-primary border border-border/50"
                  }`}
                >
                  <cat.icon size={20} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-9">
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx}`}
                      className="border border-border/50 bg-white rounded-3xl px-6 py-2 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-lg data-[state=open]:border-primary/20"
                    >
                      <AccordionTrigger className="text-left text-lg font-bold text-foreground hover:no-underline hover:text-primary py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <Card className="border-dashed border-2 border-border/50 bg-transparent py-20 text-center">
                  <CardContent>
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                      <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      No results found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or category filter.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Support CTA */}
            <div className="mt-20 bg-primary rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
              <div className="relative z-10 text-white">
                <h2 className="text-3xl font-black mb-4">
                  Still have questions?
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  Can't find the answer you're looking for? Our specialist
                  support team is ready to help you with any inquiries.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-2xl px-10 h-14 font-black"
                  >
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-10 h-14 font-bold"
                  >
                    Email us directly
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
