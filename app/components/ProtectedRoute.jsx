"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../context/useAuthContext";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
  const { authorized, setRedirectUrl, initializing } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !authorized) {
      setRedirectUrl(router.asPath);
      router.push("/login");
    }
  }, [authorized, router, setRedirectUrl, initializing]);

  if (initializing) {
    return <Loading />;
  }

  if (!authorized) {
    return <Loading />;
  }

  return children;
}
