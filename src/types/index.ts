// src/types/index.ts
// GHT (General Health Treatment) Type Definitions

// ==========================================
// User Types
// ==========================================
export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  addresses: Address[];
  defaultAddressId?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  newsletter: boolean;
  promotions: boolean;
  orderUpdates: boolean;
}

// ==========================================
// Product Types
// ==========================================
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: ProductCategory;
  subcategory?: string;
  brand?: string;
  sku?: string;
  inStock: boolean;
  stockQuantity?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCategory =
  | "supplements"
  | "equipment"
  | "personal-care"
  | "wellness"
  | "baby-family"
  | "first-aid";

export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  brands?: string[];
  inStock?: boolean;
  rating?: number;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest" | "popular";
  search?: string;
}

// ==========================================
// Cart Types
// ==========================================
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
  couponCode?: string;
}

// ==========================================
// Order Types
// ==========================================
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod = "card" | "paypal" | "cod" | "bank-transfer";

// ==========================================
// Address Types
// ==========================================
export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// ==========================================
// Form Types
// ==========================================
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  orderNumber?: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface CheckoutFormData {
  shippingAddress: Address;
  billingAddress?: Address;
  sameAsShipping: boolean;
  paymentMethod: PaymentMethod;
  notes?: string;
}

// ==========================================
// Review Types
// ==========================================
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  createdAt: Date;
}

// ==========================================
// API Response Types
// ==========================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  pagination?: PaginationInfo;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ==========================================
// Firebase Error Type
// ==========================================
export interface FirebaseError {
  code: string;
  message: string;
}

// ==========================================
// UI/Component Types
// ==========================================
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ==========================================
// Utility Types
// ==========================================
export type SortDirection = "asc" | "desc";

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface DateRange {
  from: Date;
  to: Date;
}
