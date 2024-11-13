import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(storedUser).username);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("user", JSON.stringify({ username }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <CartProvider>
      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          username={username}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signup"
            element={<SignUp onSignUpSuccess={handleLogin} />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard username={username} />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
