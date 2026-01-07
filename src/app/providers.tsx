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
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// --- Auth Context ---
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
  // Cart Logic with persistence
  const [cartCount, setCartCount] = useState(0);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Auth Logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartCount");
      if (savedCart) {
        try {
          const count = parseInt(savedCart, 10);
          if (!isNaN(count) && count >= 0) {
            setCartCount(count);
          }
        } catch (e) {
          console.error("Failed to parse cart count", e);
          localStorage.removeItem("cartCount");
        }
      }
      setCartLoaded(true);
    }
  }, []);

  // Load auth from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed && parsed.username) {
            setIsLoggedIn(true);
            setUsername(parsed.username);
          } else {
            localStorage.removeItem("user");
          }
        } catch (e) {
          console.error("Failed to parse user data", e);
          localStorage.removeItem("user");
        }
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

  const addToCart = () => {
    setCartCount((prev) => {
      const newCount = prev + 1;
      if (typeof window !== "undefined") {
        localStorage.setItem("cartCount", newCount.toString());
      }
      return newCount;
    });
  };

  const clearCart = () => {
    setCartCount(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartCount");
    }
  };

  const login = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify({ username: user }));
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      <CartContext.Provider value={{ cartCount, addToCart, clearCart }}>
        {children}
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
