import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useConversationGuard } from "../utils/hooks/useConversationGuard";
import Loading from "../components/loadings";

const ConversationPageGuard: FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const { error, loading } = useConversationGuard();
  if (loading) return <Loading text="Loading conversation ..." />;

  return error ? (
    <Navigate to="/conversations" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

export default ConversationPageGuard;
