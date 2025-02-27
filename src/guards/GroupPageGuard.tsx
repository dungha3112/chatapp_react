import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGroupGuard } from "../utils/hooks/useGroupGuard";

const GroupPageGuard: FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const { error, loading } = useGroupGuard();
  if (loading) return <div>loading conversation</div>;

  return error ? (
    <Navigate to="/groups" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

export default GroupPageGuard;
