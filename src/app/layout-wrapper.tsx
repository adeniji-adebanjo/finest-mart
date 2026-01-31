"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Heart, Shield, Truck, Clock } from "lucide-react";
import { CartSheet } from "@/components/cart/CartSheet";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-muted-foreground hover:text-primary transition-colors text-sm"
  >
    {children}
  </Link>
);

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <CartSheet />
      <main className="grow">{children}</main>
      {!shouldHideNavbar && (
        <footer className="bg-card border-t border-border">
          {/* Trust Badges */}
          <div className="border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Free Shipping
                    </p>
                    <p className="text-xs text-muted-foreground">
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Secure Payment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      100% protected
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2-3 business days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Quality Products
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Certified & trusted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl ght-gradient flex items-center justify-center text-white font-black shadow-md">
                    G
                  </div>
                  <div>
                    <span className="font-bold text-foreground text-lg">
                      GHT
                    </span>
                    <p className="text-xs text-muted-foreground -mt-0.5">
                      General Health Treatment
                    </p>
                  </div>
                </Link>
                <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                  Your trusted partner for health products, supplements, and
                  wellness essentials. Quality healthcare delivered to your
                  doorstep.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  Quick Links
                </h4>
                <div className="flex flex-col space-y-2">
                  <FooterLink href="/products">Products</FooterLink>
                  <FooterLink href="/about">About Us</FooterLink>
                  <FooterLink href="/contact">Contact</FooterLink>
                  <FooterLink href="/faq">FAQs</FooterLink>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  Categories
                </h4>
                <div className="flex flex-col space-y-2">
                  <FooterLink href="/products/supplements">
                    Supplements
                  </FooterLink>
                  <FooterLink href="/products/equipment">Equipment</FooterLink>
                  <FooterLink href="/products/personal-care">
                    Personal Care
                  </FooterLink>
                  <FooterLink href="/products/wellness">Wellness</FooterLink>
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <div className="flex flex-col space-y-2">
                  <FooterLink href="/shipping">Shipping Info</FooterLink>
                  <FooterLink href="/returns">Returns</FooterLink>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                  <FooterLink href="/terms">Terms of Service</FooterLink>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} GHT - General Health Treatment. All
                rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  Secure payments with
                </span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs font-medium px-2 py-1 bg-muted rounded">
                    Visa
                  </span>
                  <span className="text-xs font-medium px-2 py-1 bg-muted rounded">
                    MasterCard
                  </span>
                  <span className="text-xs font-medium px-2 py-1 bg-muted rounded">
                    PayPal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
