import { Page } from "../../styles";
import ConversationSidebar from "../../components/conversations/ConversationSidebar";
import { Outlet, useParams } from "react-router-dom";

const ConversationPage = () => {
  const { id } = useParams();

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
          New a conversation
        </div>
      )}
    </Page>
  );
};

export default ConversationPage;
