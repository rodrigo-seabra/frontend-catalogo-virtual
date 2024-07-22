"use client";

import ProtectedRoute from "../components/ProtectedRoute";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <div>Perfil do Usuário</div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
