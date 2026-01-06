import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Sample login function (use your own logic)
  const login = async (email, password) => {
    // Simulating a login request
    if (email === "test@example.com" && password === "password123") {
      setCurrentUser({ email }); // Store user data upon successful login
      return Promise.resolve();
    } else {
      return Promise.reject("Invalid credentials");
    }
  };

  const value = {
    currentUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
