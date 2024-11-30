import { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { ConversationType, MessageEventPayload } from "../../utils/types";
import {
  addConversation,
  updateConversation,
} from "../../store/conversations/conversationSlice";
import {
  addMessage,
  deleteMessage,
  editMessage,
} from "../../store/messages/messageSlice";
import { Page } from "../../styles";
import ConversationSidebar from "../../components/conversations/ConversationSidebar";

const ConversationPage = () => {
  const { user } = useContext(AuthContext);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  const { id: conversationId } = useParams();

  useEffect(() => {
    socket.on("connected", () => {
      console.log("Connected ...");
    });

    socket.on(
      "onConversationCreateToClientSide",
      (payload: ConversationType) => {
        dispatch(addConversation(payload));
      }
    );

    socket.on("onMessageCreateToClientSide", (payload: MessageEventPayload) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload.conversation));
    });

    socket.on("onMessageDeleteToClientSide", (payload) => {
      console.log("Message Deleted", payload);

      dispatch(deleteMessage(payload));
      // dispatch(updateMessageConversation(payload));
    });

    socket.on("onMessageEditToClientSide", (payload) => {
      console.log("Message Edit", payload);
      dispatch(editMessage(payload));
    });

    return () => {
      socket.off("connected");
      socket.off("onConversationCreateToClientSide");
      socket.off("onMessageCreateToClientSide");
      socket.off("onMessageDeleteToClientSide");
    };
  }, [socket, dispatch, conversationId]);

  return (
    <Page $display="flex" $justifyContent="space-between" $alignItems="center">
      <ConversationSidebar />
      {conversationId ? (
        <Outlet />
      ) : (
        <div
          style={{
            marginLeft: "250px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div>
            Hi {user?.firstName} {user?.lastName}
          </div>
        </div>
      )}
    </Page>
  );
};

export default ConversationPage;
