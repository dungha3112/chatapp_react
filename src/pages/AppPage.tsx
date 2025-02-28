import { Outlet, useLocation, useParams } from "react-router-dom";
import ConversationSidebar from "../components/sidebars/ConversationSidebar";
import UserSidebar from "../components/sidebars/UserSidebar";
import { LayoutPage } from "../styles";

const AppPage = () => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <LayoutPage>
      <UserSidebar />
      {location.pathname !== "/conversations" &&
        location.pathname !== "/conversations/" &&
        location.pathname !== "/groups" &&
        location.pathname !== "/groups/" &&
        !id && <ConversationSidebar />}

      <Outlet />
    </LayoutPage>
  );
};

export default AppPage;
