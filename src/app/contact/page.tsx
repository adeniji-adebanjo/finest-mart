"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ChevronRight,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (800) GHT-WELL",
      subDetails: "Mon-Fri: 9am - 8pm EST",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "support@ght-health.com",
      subDetails: "24/7 Support available",
      color: "text-teal-500",
      bg: "bg-teal-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Wellness Avenue",
      subDetails: "Medical District, NY 10001",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Contact Us
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6">
            We're Here for Your{" "}
            <span className="ght-text-gradient">Health Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions about a product, need help with an order, or looking
            for expert health advice? Our team is standing by to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side: Contact Info & Reassurance */}
          <div className="lg:col-span-5 space-y-10">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info) => (
                <Card
                  key={info.title}
                  className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden group"
                >
                  <CardContent className="p-8 flex items-start gap-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${info.bg} ${info.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-xl font-black text-foreground mb-1">
                        {info.details}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {info.subDetails}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Reassurance Section */}
            <div className="bg-primary/5 rounded-[2.5rem] p-10 border border-primary/10 space-y-8">
              <h3 className="text-2xl font-black text-foreground">
                Why reach out to us?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-ght-success/10 flex items-center justify-center shrink-0 mt-1">
                    <Stethoscope size={16} className="text-ght-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Expert Guidance</p>
                    <p className="text-sm text-muted-foreground">
                      Get product recommendations from certified health experts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-ght-success/10 flex items-center justify-center shrink-0 mt-1">
                    <ShieldCheck size={16} className="text-ght-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">
                      Quality Guarantee
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Every product is verified for scientific integrity and
                      safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-ght-success/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 size={16} className="text-ght-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Fast Resolution</p>
                    <p className="text-sm text-muted-foreground">
                      Most inquiries are handled within 2-4 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <Card className="border-border/50 shadow-2xl rounded-[3rem] overflow-hidden backdrop-blur-sm bg-card/80">
              <CardContent className="p-8 sm:p-12 lg:p-16">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">
                      Send us a Message
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 12 hours.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className={`h-14 rounded-2xl bg-background border-border/50 focus:ring-primary/20 transition-all ${errors.name ? "border-destructive focus:ring-destructive/20" : ""}`}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-xs font-medium text-destructive ml-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={`h-14 rounded-2xl bg-background border-border/50 focus:ring-primary/20 transition-all ${errors.email ? "border-destructive focus:ring-destructive/20" : ""}`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs font-medium text-destructive ml-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      className={`h-14 rounded-2xl bg-background border-border/50 focus:ring-primary/20 transition-all ${errors.subject ? "border-destructive focus:ring-destructive/20" : ""}`}
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="text-xs font-medium text-destructive ml-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground"
                    >
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      className={`min-h-[160px] rounded-2xl bg-background border-border/50 focus:ring-primary/20 transition-all py-4 ${errors.message ? "border-destructive focus:ring-destructive/20" : ""}`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs font-medium text-destructive ml-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl ght-gradient text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Send Message
                        <Send
                          size={20}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </div>
                    )}
                  </Button>
                </form>

                {/* FAQ Link */}
                <div className="mt-12 text-center pt-8 border-t border-border/50">
                  <p className="text-muted-foreground text-sm">
                    Common questions? Check our{" "}
                    <Link
                      href="/faq"
                      className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                    >
                      FAQ Center <ChevronRight size={14} />
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
