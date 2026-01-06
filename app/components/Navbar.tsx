"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth, useCart } from "../providers";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Finest<span className="text-yellow-500">Mart</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-yellow-500 transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 transition-colors font-semibold">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-semibold"
              >
                Logout
              </button>
              <div className="flex items-center space-x-1 text-gray-700 font-medium">
                <User size={18} />
                <span>Hi, {username}</span>
              </div>
            </>
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-yellow-600 transition-colors"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex lg:hidden items-center space-x-4">
          <Link href="/cart" className="relative text-gray-700">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 lg:hidden animate-in fade-in slide-in-from-top-10 duration-200">
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-gray-700"
          >
            <X size={32} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-medium text-gray-800 hover:text-yellow-500"
            >
              {link.name}
            </Link>
          ))}

          <div className="h-px w-24 bg-gray-200 my-4"></div>

          {!isLoggedIn ? (
            <div className="flex flex-col space-y-4 w-64">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center px-6 py-3 rounded-full border border-red-500 text-red-500 hover:bg-red-50 font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 font-semibold shadow-md"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 w-64">
              <div className="flex items-center justify-center space-x-2 text-gray-700 font-medium mb-2">
                <User size={20} />
                <span>Hi, {username}</span>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center px-6 py-3 rounded-full border border-green-500 text-green-600 hover:bg-green-50 font-semibold"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-center px-6 py-3 rounded-full border border-red-500 text-red-500 hover:bg-red-50 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
