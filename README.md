# GHT - General Health Treatment 🏥

A modern, full-featured e-commerce platform for health products, supplements, and wellness essentials built with Next.js 16.

![GHT Banner](./public/images/delivery-man.png)

## 🌟 Features

- **Product Catalog** - Browse health products, supplements, medical equipment, and wellness items
- **Shopping Cart** - Full cart management with quantity controls and persistent state
- **User Authentication** - Secure login/signup with Firebase Auth (Email + Google OAuth)
- **User Dashboard** - Personal dashboard with order history, wishlist, and account management
- **Responsive Design** - Mobile-first approach, works on all devices (360px+)
- **Modern UI/UX** - Glassmorphism, smooth animations, and premium aesthetics
- **SEO Optimized** - Complete meta tags, Open Graph, and Twitter cards

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives + shadcn/ui patterns
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Form Validation**: [Zod](https://zod.dev/)

## 🎨 Brand Colors

| Color           | Purpose                | Value     |
| --------------- | ---------------------- | --------- |
| Primary Teal    | Main brand color, CTAs | `#27A89A` |
| Secondary Mint  | Accents, backgrounds   | `#9DDBC8` |
| Success Green   | Confirmations          | `#22C55E` |
| Warning Amber   | Alerts, promotions     | `#EAB308` |
| Destructive Red | Errors                 | `#EF4444` |

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase project (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/adeniji-adebanjo/finest-mart.git
   cd finest-mart
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── dashboard/         # User dashboard
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── globals.css        # Global styles & design tokens
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Context providers
├── components/            # Reusable components
│   ├── ui/               # Base UI components (button, card, input, etc.)
│   ├── Hero.tsx          # Hero section
│   ├── Navbar.tsx        # Navigation bar
│   └── ErrorBoundary.tsx # Error boundary
├── lib/                   # Utilities and configurations
│   ├── firebase.ts       # Firebase configuration
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript type definitions
    └── index.ts          # All types
```

## 🚀 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🔒 Authentication

GHT uses Firebase Authentication with support for:

- Email/Password sign-in
- Google OAuth sign-in

User sessions are persisted in localStorage with the key `ght_user`.

## 🛒 Cart System

The cart system features:

- Full item management (add, remove, update quantity)
- Persistent state via localStorage (`ght_cart`)
- Real-time cart count and total calculations
- Shipping calculations (free over $50)
- Tax calculations (8%)

## 💫 Wishlist

Users can save products to their wishlist:

- Toggle items on/off wishlist
- Persistent state (`ght_wishlist`)
- Quick access from dashboard and navbar

## 📱 Responsive Breakpoints

- **Mobile**: 360px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Firebase](https://firebase.google.com/) for backend services
- [Lucide](https://lucide.dev/) for beautiful icons

---

Made with ❤️ by Adebanjo (GHT Consultant)
