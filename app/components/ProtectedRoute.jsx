"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../context/useAuthContext";

const ProtectedRoute = ({ children }) => {
  const { authorized, setRedirectUrl, initializing } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !authorized) {
      setRedirectUrl(router.asPath);
      router.push("/login");
    }
  }, [authorized, router, setRedirectUrl, initializing]);

  if (initializing) {
    return <p>Loading...</p>; // Ou algum componente de loading
  }

  if (!authorized) {
    return <p>Redirecting...</p>; // Um componente de redirecionamento opcional
  }

  return children;
};

export default ProtectedRoute;
