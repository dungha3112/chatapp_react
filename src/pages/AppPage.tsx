import { Outlet } from "react-router-dom";
import UserSidebar from "../components/sidebars/UserSidebar";
import { LayoutPage } from "../styles";

const AppPage = () => {
  return (
    <LayoutPage>
      <UserSidebar />

      <Outlet />
    </LayoutPage>
  );
};

export default AppPage;
