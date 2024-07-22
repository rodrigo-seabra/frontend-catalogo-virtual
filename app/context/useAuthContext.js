"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/");
  const [initializing, setInitializing] = useState(true);

  async function login(email, password) {
    setLoading(true);
    setError("");
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem("token", token);
      checkAuth();
      if (router && redirectUrl) {
        router.push(redirectUrl);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function register(
    email,
    password,
    confirmPassword,
    image,
    name,
    CPF,
    phone
  ) {
    setLoading(true);
    setError("");
    const user = { email, password, confirmPassword, image, name, CPF, phone };
    try {
      await registerUser(user);
      if (router) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setAuthorized(false);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorized(true);
      setUser({ token });
    } else {
      setAuthorized(false);
      setUser(null);
    }
    setInitializing(false);
  }

  const value = {
    user,
    error,
    loading,
    login,
    register,
    logout,
    setRedirectUrl,
    authorized,
    initializing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
