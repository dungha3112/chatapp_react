import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";
import Loading from "./loadings";

type Props = {
  children: React.ReactNode;
};
const AuthenticatedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <Loading text="Loading ..." />;
  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthenticatedRoute;
