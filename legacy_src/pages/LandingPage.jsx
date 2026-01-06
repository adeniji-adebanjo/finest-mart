// LandingPage.jsx
import React from "react";
// import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCards from "../components/ProductCards";
import { CartProvider, useCart } from "../components/CartContext";

const LandingPage = () => {
  const { addToCart } = useCart(); // Use the useCart hook

  return (
    <CartProvider>
      {/* <Navbar /> */}
      <Hero onAddToCart={addToCart} /> {/* Pass the addToCart function here */}
      <ProductCards onAddToCart={addToCart} />{" "}
      {/* Pass to ProductCards if needed */}
    </CartProvider>
  );
};

export default LandingPage;
