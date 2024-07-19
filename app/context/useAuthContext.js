"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  async function login(email, password) {
    setLoading(true);
    setError("");
    try {
      const { token } = await loginUser(email, password);
      console.log(token);
      localStorage.setItem("token", token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password, name) {
    setLoading(true);
    setError("");
    try {
      await registerUser(email, password, name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }

  const value = {
    user,
    error,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar o contexto
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
