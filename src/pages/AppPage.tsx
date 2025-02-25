import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "../components/sidebars/UserSidebar";
import { LayoutPage } from "../styles";
import { useAuth } from "../utils/hooks/useAuth";
import { useEffect } from "react";

const AppPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) return navigate("/conversations");
  }, [navigate, user]);

  return (
    <LayoutPage>
      <UserSidebar />

      <Outlet />
    </LayoutPage>
  );
};

export default AppPage;
