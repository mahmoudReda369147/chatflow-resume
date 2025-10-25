import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authServices } from "@/api/auth/authServices";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthed = authServices.isAuthenticated();

  if (!isAuthed) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
