import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};
const AuthenticatedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <div>Loading ...</div>;
  if (user) return <>{children}</>;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthenticatedRoute;
