import { Page } from "../../styles";
import ConversationSidebar from "../../components/conversations/ConversationSidebar";
import { Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";

const ConversationPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  return (
    <Page display="flex" justifyContent="space-between" alignItems="center">
      <ConversationSidebar />
      {id ? (
        <Outlet />
      ) : (
        <div
          style={{
            marginLeft: "250px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          Hi {user?.firstName} {user?.lastName}
        </div>
      )}
    </Page>
  );
};

export default ConversationPage;
