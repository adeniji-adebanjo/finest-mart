import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart"; // Import your Cart component
import "./App.css";
import "./css/styleguide.css";
import ProductCards from "./components/ProductCards"; // Ensure this is the correct path

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCartCount = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />{" "}
          {/* Ensure correct usage */}
          <Route path="/cart" element={<Cart />} /> {/* Ensure correct usage */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
