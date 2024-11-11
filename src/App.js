import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Cart from "./components/Cart";
import "./App.css";
import "./css/styleguide.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check local storage for user info (persist login state after refresh)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(storedUser).username);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear localStorage on logout
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
