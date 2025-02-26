import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UserSidebar from "../components/sidebars/UserSidebar";
import { LayoutPage } from "../styles";
import { useAuth } from "../utils/hooks/useAuth";

const AppPage = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user) <Navigate to={location} state={{ from: location }} replace />;
  }, [user, location]);

  return (
    <LayoutPage>
      <UserSidebar />

      <Outlet />
    </LayoutPage>
  );
};

export default AppPage;
