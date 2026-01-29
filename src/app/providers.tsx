"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import type { CartItem, Product } from "@/types";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- Cart Context ---
interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  couponCode: string | null;
  discount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const COUPONS: Record<string, { type: "percent" | "fixed"; value: number }> = {
  WELCOME10: { type: "percent", value: 0.1 }, // 10% off
  SAVE20: { type: "fixed", value: 20 }, // $20 off
  GHT50: { type: "fixed", value: 50 },
};

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
  userId: string | null;
  login: (username: string, userId?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// --- Wishlist Context ---
interface WishlistContextType {
  wishlistItems: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

// --- Helper Functions ---
const safeJSONParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

// --- Main Providers Component ---
export function Providers({ children }: { children: ReactNode }) {
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  // Calculate cart totals
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) -
    discount;

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = safeLocalStorage.getItem("ght_cart");
    const parsedCart = safeJSONParse<CartItem[]>(savedCart, []);
    setCartItems(parsedCart);

    // Load coupon
    const savedCoupon = safeLocalStorage.getItem("ght_coupon");
    if (savedCoupon && COUPONS[savedCoupon]) {
      setCouponCode(savedCoupon);
      // Recalculate discount
      // We need the cart total before discount to calculate percent
      // But here we are in init. We can just set the coupon code and let the effect or logic handle it.
      // Actually, we need to set the discount state based on the cart.
      // But cartItems might not be set yet if using state updater?
      // No, setCartItems is synchronous-ish in React 18 batching, but we can't rely on `cartItems` variable here.
      // We have `parsedCart`.

      const subtotal = parsedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const coupon = COUPONS[savedCoupon];
      let disc = 0;
      if (coupon.type === "percent") {
        disc = subtotal * coupon.value;
      } else {
        disc = coupon.value;
      }
      // Ensure discount doesn't exceed subtotal
      setDiscount(Math.min(disc, subtotal));
    }

    setCartLoaded(true);
  }, []);

  // Recalculate discount when cart changes
  useEffect(() => {
    if (!couponCode) {
      setDiscount(0);
      return;
    }

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const coupon = COUPONS[couponCode];

    if (!coupon) {
      setDiscount(0);
      return;
    }

    let disc = 0;
    if (coupon.type === "percent") {
      disc = subtotal * coupon.value;
    } else {
      disc = coupon.value;
    }
    setDiscount(Math.min(disc, subtotal));
  }, [cartItems, couponCode]);

  // Save cart to localStorage when it changes
  // Save cart to localStorage when it changes
  useEffect(() => {
    if (cartLoaded) {
      safeLocalStorage.setItem("ght_cart", JSON.stringify(cartItems));
      if (couponCode) {
        safeLocalStorage.setItem("ght_coupon", couponCode);
      } else {
        safeLocalStorage.removeItem("ght_coupon");
      }
    }
  }, [cartItems, cartLoaded, couponCode]);

  // Sync Cart with Firestore
  useEffect(() => {
    if (!userId || !cartLoaded) return;

    const fetchRemoteCart = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.cart) {
            const remoteCart = data.cart as CartItem[];

            setCartItems((currentCart) => {
              if (currentCart.length === 0) {
                return remoteCart;
              }

              // Merge remote into local
              // We create a map for easier lookups
              const mergedMap = new Map<string, CartItem>();

              // Add local items first
              currentCart.forEach((item) => mergedMap.set(item.id, item));

              // Merge remote items
              remoteCart.forEach((remoteItem) => {
                if (mergedMap.has(remoteItem.id)) {
                  // Item exists locally and remotely.
                  // Strategy: Max quantity or Sum? Let's use Remote (assuming it's the source of truth if saved)
                  // OR Sum if we treat local as "newly added".
                  // Let's Sum for better UX (didn't lose "guest" actions).
                  const existing = mergedMap.get(remoteItem.id)!;
                  mergedMap.set(remoteItem.id, {
                    ...existing,
                    quantity: existing.quantity + remoteItem.quantity,
                  });
                } else {
                  mergedMap.set(remoteItem.id, remoteItem);
                }
              });

              return Array.from(mergedMap.values());
            });
          }
        }
      } catch (error) {
        console.error("Failed to sync cart from Firestore:", error);
      }
    };

    fetchRemoteCart();
  }, [userId, cartLoaded]);

  // Save Cart to Firestore
  useEffect(() => {
    if (!userId || !cartLoaded || !mounted) return;

    const timeout = setTimeout(async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, { cart: cartItems }, { merge: true });
      } catch (error) {
        console.error("Failed to save cart to Firestore:", error);
      }
    }, 1000); // Debounce 1s

    return () => clearTimeout(timeout);
  }, [cartItems, userId, cartLoaded, mounted]);

  // Load auth from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedUser = safeLocalStorage.getItem("ght_user");
    const parsed = safeJSONParse<{
      username: string;
      userId?: string;
    } | null>(storedUser, null);

    if (parsed?.username) {
      setIsLoggedIn(true);
      setUsername(parsed.username);
      setUserId(parsed.userId || null);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ght_user" && e.newValue === null) {
        setIsLoggedIn(false);
        setUsername("");
        setUserId(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = safeLocalStorage.getItem("ght_wishlist");
    const parsedWishlist = safeJSONParse<string[]>(savedWishlist, []);
    setWishlistItems(parsedWishlist);
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      safeLocalStorage.setItem("ght_wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, mounted]);

  // Cart UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Cart Functions
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      // ... existing logic ...
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          description: product.description,
        },
      ];
    });
    setIsCartOpen(true); // Open cart when item is added
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    safeLocalStorage.removeItem("ght_cart");
  }, []);

  const isInCart = useCallback(
    (productId: string) => cartItems.some((item) => item.id === productId),
    [cartItems],
  );

  const applyCoupon = useCallback((code: string) => {
    if (COUPONS[code]) {
      setCouponCode(code);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
  }, []);

  // Auth Functions
  const login = useCallback((user: string, id?: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    setUserId(id || null);
    safeLocalStorage.setItem(
      "ght_user",
      JSON.stringify({ username: user, userId: id }),
    );
  }, []);

  const logout = useCallback(() => {
    safeLocalStorage.removeItem("ght_user");
    setIsLoggedIn(false);
    setUsername("");
    setUserId(null);
  }, []);

  // Wishlist Functions
  const addToWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlistItems.includes(productId),
    [wishlistItems],
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    safeLocalStorage.removeItem("ght_wishlist");
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, userId, login, logout }}
    >
      <CartContext.Provider
        value={{
          cartItems,
          cartCount,
          cartTotal,
          isCartOpen,
          openCart,
          closeCart,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          isInCart,
          couponCode,
          discount,
          applyCoupon,
          removeCoupon,
        }}
      >
        <WishlistContext.Provider
          value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
          }}
        >
          {children}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
