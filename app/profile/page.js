"use client";

import ProtectedRoute from "../components/ProtectedRoute";
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div>Perfil do Usuário</div>
    </ProtectedRoute>
  );
}
