import { Outlet } from "react-router-dom";
import UserSidebar from "../components/sidebars/UserSidebar";
import { Page } from "../styles";
import ConversationSidebar from "../components/sidebars/ConversationSidebar";

const AppPage = () => {
  return (
    <Page>
      {/* <UserSidebar /> */}
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
};

export default AppPage;
