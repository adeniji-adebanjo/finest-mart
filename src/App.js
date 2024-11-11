import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import "./App.css";
import "./css/styleguide.css";
import ProductCards from "./components/ProductCards"; // Ensure this is the correct path

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const incrementCartCount = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <CartProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
