"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth, useCart } from "../app/providers";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Heart,
  Search,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { products } from "@/data/products";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, username, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      const matches = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "#categories" },
    { name: "Deals", href: "#deals" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <nav className="glass px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl ght-gradient flex items-center justify-center text-white font-black text-sm shadow-md">
            G
          </div>
          <span className="hidden sm:inline">
            GHT
            <span className="text-primary font-medium text-lg ml-1 hidden lg:inline">
              Health
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-medium text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-2">
          {/* Search Bar */}
          <div className="hidden xl:flex items-center relative group">
            <form
              onSubmit={handleSearch}
              className="flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search health products..."
                value={searchQuery}
                onFocus={() =>
                  searchQuery.length > 1 && setShowSuggestions(true)
                }
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-primary/5 border border-transparent focus:border-primary/30 focus:bg-background h-10 w-64 pl-4 pr-10 rounded-xl text-sm transition-all focus:w-80 outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 text-muted-foreground group-focus-within:text-primary transition-colors"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute top-12 left-0 w-80 bg-background border border-border shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setShowSuggestions(false)}
              >
                <div className="p-2 border-b border-border/50 text-[10px] uppercase font-black tracking-widest text-muted-foreground px-4 py-2">
                  Suggestions
                </div>
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.category.toLowerCase().replace(/ /g, "-")}/${p.slug}`}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-muted rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium">
                        {p.category}
                      </p>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/search?q=${searchQuery}`}
                  onClick={() => setShowSuggestions(false)}
                  className="block w-full text-center py-3 text-xs font-bold text-primary hover:bg-primary/5 border-t border-border/50"
                >
                  See all results
                </Link>
              </div>
            )}
          </div>

          {/* Search Button (for smaller screens) */}
          <Button
            onClick={() => router.push("/search")}
            variant="ghost"
            size="icon"
            className="xl:hidden text-muted-foreground hover:text-primary hover:bg-primary/5"
          >
            <Search size={20} />
          </Button>

          {/* Wishlist */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary hover:bg-primary/5"
          >
            <Link href="/wishlist">
              <Heart size={20} />
            </Link>
          </Button>

          {/* Cart Icon */}
          <Button
            onClick={openCart}
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-primary hover:bg-primary/5"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          {!isLoggedIn ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="text-muted-foreground hover:text-primary hover:bg-primary/5"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="ght-gradient text-white hover:opacity-90 shadow-md"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
              >
                <Link href="/dashboard">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={14} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {username}
                  </span>
                  <ChevronDown size={14} />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive/50"
              >
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex lg:hidden items-center space-x-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground"
          >
            <Link href="/cart">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-foreground"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col lg:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          {/* Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-xl font-bold"
            >
              <div className="w-8 h-8 rounded-xl ght-gradient flex items-center justify-center text-white font-black text-sm">
                G
              </div>
              <span>GHT</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X size={28} />
            </Button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-lg font-medium text-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-px bg-border my-6" />

            {/* Mobile Auth Actions */}
            {!isLoggedIn ? (
              <div className="space-y-3 px-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 text-base rounded-xl border-primary/30 text-primary hover:bg-primary/5"
                >
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full h-12 text-base rounded-xl ght-gradient text-white shadow-md"
                >
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3 px-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{username}</p>
                    <p className="text-sm text-muted-foreground">
                      View your account
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 text-base rounded-xl border-primary/30 text-primary hover:bg-primary/5"
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
                  className="w-full h-12 text-base rounded-xl border-destructive/30 text-destructive hover:bg-destructive/5"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
