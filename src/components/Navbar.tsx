"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth, useCart } from "../app/providers";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, username, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "#categories" },
    { name: "Sales", href: "#sales" },
    { name: "FAQs", href: "#faqs" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <nav className="glass px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Finest<span className="text-yellow-500">Mart</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Button
                asChild
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 mr-2">
                <User size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium">Hi, {username}</span>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </Button>
            </>
          )}

          {/* Cart Icon */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative hover:bg-transparent hover:text-yellow-600"
          >
            <Link href="/cart">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex lg:hidden items-center space-x-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative hover:bg-transparent"
          >
            <Link href="/cart">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="hover:bg-transparent"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 lg:hidden animate-in fade-in slide-in-from-top-10 duration-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="absolute top-6 right-6"
          >
            <X size={32} />
          </Button>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <div className="h-px w-24 bg-border my-4"></div>

          {!isLoggedIn ? (
            <div className="flex flex-col space-y-4 w-64">
              <Button
                asChild
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 rounded-full h-12 text-lg"
              >
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button
                asChild
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full h-12 text-lg shadow-md"
              >
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 w-64">
              <div className="flex items-center justify-center space-x-2 text-foreground font-medium mb-2">
                <User size={20} />
                <span>Hi, {username}</span>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-full h-12 text-lg"
              >
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 rounded-full h-12 text-lg"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
