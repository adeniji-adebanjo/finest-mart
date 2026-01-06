"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!shouldHideNavbar && (
        <footer className="py-8 text-center text-gray-500 text-sm bg-white border-t border-gray-100">
          © {new Date().getFullYear()} Finest Mart. All rights reserved.
        </footer>
      )}
    </>
  );
}
