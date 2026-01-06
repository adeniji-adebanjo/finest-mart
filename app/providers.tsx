"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// --- Cart Context ---
interface CartContextType {
  cartCount: number;
  addToCart: (item?: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// --- Auth Context (Simple version to match legacy App.js behavior initially) ---
// Note: In a real Next.js app, you might use next-auth or keep firebase client-side.
// We'll mimic the legacy localStorage behavior but wrapped nicely.

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export function Providers({ children }: { children: ReactNode }) {
  // Cart Logic
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  // Auth Logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUsername(parsed.username);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue === null) {
        setIsLoggedIn(false);
        setUsername("");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem("user", JSON.stringify({ username: user }));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
  };

  // Avoid hydration mismatch by rendering children only after mount if using localStorage affecting UI
  // But for providers, it's usually better to just let it run.
  // However, isLoggedIn default is false, which matches server.

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      <CartContext.Provider value={{ cartCount, addToCart }}>
        {children}
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
