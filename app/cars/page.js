"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import Loading from "../components/Loading";
export default function CarsPage() {
  return (
    <ProtectedRoute>
      <div>Página dos carros</div>
    </ProtectedRoute>
  );
}
