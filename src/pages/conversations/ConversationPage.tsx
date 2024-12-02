import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../../components/conversations/ConversationSidebar";
import { AppDispatch } from "../../store";
import {
  addConversation,
  updateConversation,
} from "../../store/conversations/conversationSlice";
import { fetchConversationsThunk } from "../../store/conversations/conversationThunk";
import {
  addMessage,
  deleteMessage,
  editMessage,
} from "../../store/messages/messageSlice";
import { Page } from "../../styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { ConversationType, MessageEventPayload } from "../../utils/types";
import { updateType } from "../../store/selectedSlice";

const ConversationPage = () => {
  const { user } = useContext(AuthContext);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  useEffect(() => {
    dispatch(updateType("private"));
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

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
  }, [socket, dispatch]);

  return (
    <Page $display="flex" $justifyContent="space-between" $alignItems="center">
      <ConversationSidebar />
      {!id && (
        <div
          style={{
            marginLeft: "280px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          Hi {user?.firstName + " " + user?.lastName} conversation
        </div>
      )}
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
