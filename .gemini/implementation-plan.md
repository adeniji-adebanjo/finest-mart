# GHT (General Health Treatment) - E-Commerce Implementation Plan

> **Project Transformation:** Finest-Mart → GHT (General Health Treatment)  
> **Generated:** January 29, 2026  
> **Status:** Planning Phase

---

## 📋 Executive Summary

This document outlines the comprehensive implementation plan for transforming the existing Finest-Mart grocery platform into **GHT (General Health Treatment)** - a full-fledged health and wellness e-commerce application. The revamp will include complete branding overhaul, advanced shopping cart functionality, checkout processes, product management, user accounts, and modern UI/UX enhancements.

---

## 🔍 Current Codebase Analysis

### Existing Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4.0 with CSS variables
- **UI Components:** Radix UI primitives + shadcn/ui patterns
- **Authentication:** Firebase Auth (Email/Password + Google OAuth)
- **Database:** Firebase Firestore (configured but minimally used)
- **Animations:** Framer Motion
- **Fonts:** Raleway (Google Fonts)
- **Icons:** Lucide React, React Icons

### Current Features (Skeleton Implementation)

- ✅ Basic authentication (login/signup with Firebase)
- ✅ Simple cart context (count only, no items)
- ✅ Hero section with placeholder products
- ✅ Responsive navbar with mobile menu
- ✅ Dashboard page (placeholder)
- ✅ Cart page (placeholder)
- ⚠️ No actual product catalog
- ⚠️ No checkout process
- ⚠️ No order management
- ⚠️ No product details pages
- ⚠️ No search/filter functionality

### Files to Clean Up / Refactor

1. `src/app/providers.tsx` - Has `any` type usage, cart stores only count
2. `src/components/Hero.tsx` - Uses `any` type in `onAddToCart`
3. `tailwind.config.js` - References non-existent `legacy_src` folder
4. `README.md` - Outdated (mentions Redux, Bootstrap, etc.)
5. Brand references throughout - Need to update to GHT

---

## 🎨 Brand Identity: GHT (General Health Treatment)

### Color Palette

| Color                 | Purpose                | HSL Value     |
| --------------------- | ---------------------- | ------------- |
| **Primary (Teal)**    | Main brand color, CTAs | `170 65% 45%` |
| **Secondary (Mint)**  | Accents, highlights    | `160 50% 75%` |
| **Success (Green)**   | Confirmations, health  | `142 71% 45%` |
| **Warning (Amber)**   | Alerts, promotions     | `45 93% 47%`  |
| **Destructive (Red)** | Errors, danger         | `0 84% 60%`   |
| **Background**        | Light mode base        | `165 30% 98%` |
| **Foreground**        | Primary text           | `170 50% 10%` |

### Typography

- **Headings:** Inter (Google Fonts) - Clean, modern, medical feel
- **Body:** Inter - Excellent readability
- **Accent:** Space Grotesk (for prices, badges)

### Design Tokens

- Border radius: 12px (rounded, friendly)
- Shadows: Soft, elevated feel
- Animations: Smooth, 200-300ms transitions
- Glassmorphism for headers/overlays

---

## 📦 Phase 1: Foundation & Cleanup (Week 1)

### 1.1 Project Configuration Updates

- [ ] Update `package.json` - change name to "ght-store"
- [ ] Update all metadata in `layout.tsx`
- [ ] Create new favicon and logo assets
- [ ] Update `manifest.json` with GHT branding
- [ ] Update `robots.txt` and create `sitemap.ts`
- [ ] Clean `tailwind.config.js` (remove legacy_src reference)

### 1.2 Brand Color System Update

- [ ] Update `globals.css` with new GHT color palette
- [ ] Create CSS custom properties for brand colors
- [ ] Update dark mode color scheme
- [ ] Add new utility classes for GHT-specific styles

### 1.3 Type System Overhaul

- [ ] Update `src/types/index.ts` with comprehensive types
- [ ] Add health product-specific types (supplements, medications, equipment)
- [ ] Create strict typing for cart items (remove `any`)
- [ ] Add checkout/payment types
- [ ] Add form validation schemas with Zod

### 1.4 Provider System Enhancement

- [ ] Refactor `CartContext` to store actual cart items
- [ ] Add `WishlistContext`
- [ ] Add `ProductContext` for global product state
- [ ] Create `CheckoutContext` for multi-step checkout
- [ ] Type-safe all context hooks

---

## 🛍️ Phase 2: Product System (Week 2)

### 2.1 Product Data Layer

- [ ] Create product data structure in Firestore
- [ ] Build `src/lib/products.ts` - product fetching utilities
- [ ] Create `src/hooks/useProducts.ts` - React Query integration
- [ ] Add product categories for health/wellness
- [ ] Implement product search/filter logic

### 2.2 Product Categories (GHT-Specific)

```
├── Supplements & Vitamins
│   ├── Multivitamins
│   ├── Minerals
│   ├── Protein & Fitness
│   └── Herbal Supplements
├── Medical Equipment
│   ├── Blood Pressure Monitors
│   ├── Thermometers
│   ├── First Aid
│   └── Mobility Aids
├── Personal Care
│   ├── Skincare
│   ├── Oral Care
│   ├── Hair Care
│   └── Body Care
├── Wellness & Lifestyle
│   ├── Essential Oils
│   ├── Sleep & Relaxation
│   ├── Fitness Accessories
│   └── Healthy Snacks
└── Baby & Family
    ├── Baby Nutrition
    ├── Baby Care
    └── Family Health
```

### 2.3 Product Components

- [ ] `ProductCard.tsx` - Reusable product display card
- [ ] `ProductGrid.tsx` - Grid layout with loading states
- [ ] `ProductQuickView.tsx` - Modal preview
- [ ] `ProductBadge.tsx` - Sale, new, bestseller badges
- [ ] `ProductRating.tsx` - Star rating display
- [ ] `ProductPrice.tsx` - Price with discount formatting

### 2.4 Product Pages

- [ ] `/products` - Main product listing page
- [ ] `/products/[category]` - Category-specific listings
- [ ] `/products/[category]/[slug]` - Individual product page
- [ ] `/search` - Search results page

---

## 🛒 Phase 3: Shopping Cart (Week 3)

### 3.1 Cart State Management

- [ ] Full cart implementation with items, quantities, totals
- [ ] Persist cart to localStorage
- [ ] Sync cart with Firebase for logged-in users
- [ ] Cart item quantity controls
- [ ] Remove/clear cart functionality

### 3.2 Cart Components

- [ ] `CartDrawer.tsx` - Slide-out cart sidebar
- [ ] `CartItem.tsx` - Individual cart item row
- [ ] `CartSummary.tsx` - Subtotal, tax, shipping, total
- [ ] `CartEmpty.tsx` - Empty cart state with CTA
- [ ] `MiniCart.tsx` - Navbar cart dropdown preview

### 3.3 Cart Page Enhancement

- [ ] Full cart page redesign
- [ ] Quantity adjustment with +/- buttons
- [ ] Save for later functionality
- [ ] Apply coupon/discount code
- [ ] Estimated shipping calculator
- [ ] Continue shopping / Proceed to checkout CTAs

---

## 💳 Phase 4: Checkout System (Week 4)

### 4.1 Multi-Step Checkout Flow

```
Step 1: Cart Review
   ↓
Step 2: Shipping Information
   ↓
Step 3: Payment Method
   ↓
Step 4: Order Review & Confirmation
   ↓
Step 5: Order Success
```

### 4.2 Checkout Components

- [ ] `CheckoutProgress.tsx` - Step indicator
- [ ] `ShippingForm.tsx` - Address collection with validation
- [ ] `PaymentForm.tsx` - Payment method selection
- [ ] `OrderReview.tsx` - Final order summary
- [ ] `OrderConfirmation.tsx` - Success page

### 4.3 Payment Integration (Simulated)

- [ ] Mock payment processing
- [ ] Card input form (visual only)
- [ ] PayPal/Apple Pay buttons (UI only initially)
- [ ] Payment success/failure handling

### 4.4 Checkout Pages

- [ ] `/checkout` - Main checkout page
- [ ] `/checkout/success` - Order confirmation
- [ ] `/checkout/failed` - Payment failure handling

---

## 👤 Phase 5: User Account System (Week 5)

### 5.1 Account Dashboard

- [ ] `/dashboard` - Overview with quick stats
- [ ] `/dashboard/orders` - Order history
- [ ] `/dashboard/orders/[id]` - Individual order details
- [ ] `/dashboard/profile` - Profile management
- [ ] `/dashboard/addresses` - Saved addresses
- [ ] `/dashboard/wishlist` - Saved items
- [ ] `/dashboard/settings` - Account settings

### 5.2 Account Components

- [ ] `AccountSidebar.tsx` - Dashboard navigation
- [ ] `OrderCard.tsx` - Order history card
- [ ] `OrderStatus.tsx` - Visual status indicator
- [ ] `AddressCard.tsx` - Saved address display
- [ ] `ProfileForm.tsx` - Profile edit form
- [ ] `PasswordChange.tsx` - Security settings

### 5.3 Order Management

- [ ] Store orders in Firestore
- [ ] Order status tracking
- [ ] Order history retrieval
- [ ] Reorder functionality

---

## 🏠 Phase 6: Homepage & Landing (Week 6)

### 6.1 Hero Section Redesign

- [ ] New health-focused hero with GHT branding
- [ ] Dynamic hero banners (carousel)
- [ ] Featured products showcase
- [ ] Trust badges (secure, certified, fast shipping)

### 6.2 Homepage Sections

- [ ] `CategoryShowcase.tsx` - Browse by category
- [ ] `FeaturedProducts.tsx` - Staff picks
- [ ] `BestSellers.tsx` - Top selling items
- [ ] `NewArrivals.tsx` - Latest products
- [ ] `HealthTips.tsx` - Blog/tips preview
- [ ] `Testimonials.tsx` - Customer reviews
- [ ] `Newsletter.tsx` - Email signup
- [ ] `TrustBadges.tsx` - Certifications & guarantees

### 6.3 Footer Enhancement

- [ ] Multi-column footer
- [ ] Newsletter subscription
- [ ] Social media links
- [ ] Payment method icons
- [ ] Quick links (policies, FAQ, contact)

---

## 📝 Phase 7: Forms & User Requests (Week 7)

### 7.1 Contact & Inquiry Forms

- [ ] `/contact` - Contact us page
- [ ] `ContactForm.tsx` - General inquiries
- [ ] `PrescriptionRequest.tsx` - Request form for prescriptions
- [ ] `ProductInquiry.tsx` - Product-specific questions
- [ ] `BulkOrderForm.tsx` - Corporate/bulk orders

### 7.2 Form Infrastructure

- [ ] Form validation with Zod
- [ ] React Hook Form integration
- [ ] Firebase form submission storage
- [ ] Email notifications (Firebase Functions prep)
- [ ] Success/error toast notifications

### 7.3 Additional Pages

- [ ] `/about` - About GHT
- [ ] `/faq` - Frequently asked questions
- [ ] `/shipping` - Shipping information
- [ ] `/returns` - Return policy
- [ ] `/privacy` - Privacy policy
- [ ] `/terms` - Terms of service

---

## 🔧 Phase 8: Advanced Features (Week 8)

### 8.1 Search & Filtering

- [ ] Global search with autocomplete
- [ ] Advanced filtering (price, category, rating, brand)
- [ ] Sort options (price, popularity, newest)
- [ ] Search history
- [ ] "No results" with suggestions

### 8.2 Wishlist System

- [ ] Add/remove from wishlist
- [ ] Wishlist persistence
- [ ] Move to cart from wishlist
- [ ] Share wishlist functionality

### 8.3 Product Reviews

- [ ] Star rating system
- [ ] Review submission form
- [ ] Review display on product pages
- [ ] Helpful/not helpful voting
- [ ] Review moderation (admin)

### 8.4 Notifications

- [ ] Toast notification system
- [ ] Email notification preferences
- [ ] Back in stock alerts
- [ ] Price drop alerts

---

## 🎨 Phase 9: UI/UX Polish (Week 9)

### 9.1 Additional UI Components

- [ ] `Badge.tsx` - Various badge styles
- [ ] `Select.tsx` - Styled select dropdowns
- [ ] `Dialog.tsx` - Modal dialogs
- [ ] `Toast.tsx` - Notification toasts
- [ ] `Tabs.tsx` - Tabbed interfaces
- [ ] `Accordion.tsx` - FAQ-style expandable sections
- [ ] `Breadcrumb.tsx` - Navigation breadcrumbs
- [ ] `Pagination.tsx` - Product list pagination
- [ ] `Skeleton.tsx` - Loading skeletons
- [ ] `Avatar.tsx` - User avatars

### 9.2 Animations & Micro-interactions

- [ ] Page transitions with Framer Motion
- [ ] Cart add animation (fly to cart)
- [ ] Button hover effects
- [ ] Loading states and spinners
- [ ] Scroll animations for homepage

### 9.3 Responsive Design Audit

- [ ] Mobile-first approach verification
- [ ] Tablet breakpoint optimization
- [ ] Desktop wide-screen handling
- [ ] Touch-friendly interactions

---

## 🧪 Phase 10: Testing & Optimization (Week 10)

### 10.1 Performance Optimization

- [ ] Image optimization with Next.js Image
- [ ] Lazy loading for images
- [ ] Code splitting optimization
- [ ] Bundle size analysis
- [ ] Core Web Vitals audit

### 10.2 SEO Implementation

- [ ] Dynamic meta tags per page
- [ ] Open Graph images
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] Robots.txt optimization

### 10.3 Accessibility (a11y)

- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Focus states
- [ ] ARIA labels

### 10.4 Error Handling

- [ ] Global error boundary enhancement
- [ ] 404 page design
- [ ] 500 error page
- [ ] Offline mode handling
- [ ] Form error messaging

---

## 📁 Proposed File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── layout.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   ├── page.tsx (homepage)
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   ├── cart/
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   ├── success/
│   │   │   └── failed/
│   │   ├── search/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faq/
│   │   └── [...policies]/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── orders/
│   │   ├── profile/
│   │   ├── addresses/
│   │   ├── wishlist/
│   │   └── settings/
│   ├── api/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── contact/
│   │   └── newsletter/
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── MiniCart.tsx
│   ├── checkout/
│   │   ├── CheckoutProgress.tsx
│   │   ├── ShippingForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── OrderReview.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductGallery.tsx
│   │   └── ProductFilters.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── CategoryShowcase.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── ProductInquiry.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   └── shared/
│       ├── Logo.tsx
│       ├── Breadcrumb.tsx
│       ├── Pagination.tsx
│       └── EmptyState.tsx
├── contexts/
│   ├── CartContext.tsx
│   ├── AuthContext.tsx
│   ├── WishlistContext.tsx
│   └── CheckoutContext.tsx
├── hooks/
│   ├── useCart.ts
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useWishlist.ts
│   └── useLocalStorage.ts
├── lib/
│   ├── firebase.ts
│   ├── utils.ts
│   ├── constants.ts
│   ├── validations.ts
│   └── api.ts
├── types/
│   ├── index.ts
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── user.ts
└── data/
    ├── products.json (mock data)
    ├── categories.ts
    └── navigation.ts
```

---

## 📊 Dependencies to Add

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.x",
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-select": "^2.x",
    "@radix-ui/react-tabs": "^1.x",
    "@radix-ui/react-toast": "^1.x",
    "@radix-ui/react-avatar": "^1.x",
    "@radix-ui/react-checkbox": "^1.x",
    "@radix-ui/react-radio-group": "^1.x",
    "@radix-ui/react-separator": "^1.x",
    "@hookform/resolvers": "^3.x",
    "react-hook-form": "^7.x",
    "zustand": "^4.x",
    "embla-carousel-react": "^8.x",
    "sonner": "^1.x"
  }
}
```

---

## 🚀 Quick Start for Development

### Immediate First Steps

1. **Rename and Rebrand** - Update package.json, metadata, logo
2. **Clean Up Types** - Remove all `any` types
3. **Update Colors** - Apply new GHT color palette
4. **Enhance Cart** - Full cart item management

### Development Priority Order

1. Foundation & Cleanup (Phase 1)
2. Product System (Phase 2)
3. Shopping Cart (Phase 3)
4. Homepage Redesign (Phase 6)
5. Checkout System (Phase 4)
6. User Accounts (Phase 5)
7. Forms & Pages (Phase 7)
8. Advanced Features (Phase 8)
9. UI Polish (Phase 9)
10. Testing & Launch (Phase 10)

---

## ✅ Success Metrics

- [ ] All placeholder content replaced with real components
- [ ] Full shopping experience from browse to checkout
- [ ] Mobile-responsive on all pages (360px minimum)
- [ ] Lighthouse score > 90 for Performance, Accessibility, SEO
- [ ] No TypeScript `any` types or errors
- [ ] Complete cart and checkout flow working
- [ ] User authentication and account management
- [ ] Contact/inquiry forms with validation

---

_This implementation plan will be iteratively refined as development progresses._
