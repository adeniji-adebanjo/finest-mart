"use client";

import Hero from "../components/Hero";

// Force dynamic rendering for pages using client-side state
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <Hero />

      {/* 
        This is where ProductCards would go. 
        For now, we have the Hero section active.
      */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Popular Products</h2>
          <p className="text-gray-500 mt-2">Our freshest picks for you</p>
        </div>

        <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 text-gray-400">
          Product List Component Coming Soon...
        </div>
      </section>
    </div>
  );
}
