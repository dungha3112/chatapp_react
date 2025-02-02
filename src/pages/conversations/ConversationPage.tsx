import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import { AppDispatch, RootState } from "../../store";
import {
  addConversation,
  editOrDeleteLastMessageConversation,
  updateConversation,
} from "../../store/conversations/conversationSlice";
import { fetchConversationsThunk } from "../../store/conversations/conversationThunk";
import {
  addMessage,
  deleteMessage,
  editMessage,
  selectConversationMessage,
} from "../../store/messages/messageSlice";
import { updateType } from "../../store/selectedSlice";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { SocketContext } from "../../utils/contexts/SocketContext";
import {
  ConversationType,
  MessageEventPayload,
  MessageType,
} from "../../utils/types";

const ConversationPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  const conversationMessage = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );

  useEffect(() => {
    dispatch(updateType("private"));
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("connected", () => {
      console.log("Connected ...");
    });
    socket.on("disconnected", () => {
      console.log("disconnected ...");
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

    socket.on("onMessageDeleteToClientSide", (payload: MessageType) => {
      console.log("Message Deleted", payload);

      dispatch(deleteMessage(payload));
      dispatch(
        editOrDeleteLastMessageConversation({
          isEdit: false,
          messages: conversationMessage?.messages.slice(0, 2),
          conversationId: Number(payload.conversation?.id),
          message: payload as MessageType,
        })
      );
    });

    socket.on("onMessageEditToClientSide", (payload: MessageType) => {
      console.log("Message Edit", payload);
      dispatch(editMessage(payload));

      dispatch(
        editOrDeleteLastMessageConversation({
          isEdit: true,
          messages: [],
          conversationId: Number(payload.conversation?.id),
          message: payload as MessageType,
        })
      );
    });

    return () => {
      socket.off("connected");
      socket.off("disconnected");
      socket.off("onConversationCreateToClientSide");
      socket.off("onMessageCreateToClientSide");

      socket.off("onMessageDeleteToClientSide");
      socket.off("onMessageEditToClientSide");
    };
  }, [conversationMessage?.messages, dispatch, socket]);

  return (
    <>
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
          Hi {user?.firstName + " " + user?.lastName} conversations
        </div>
      )}
      <Outlet />
    </>
  );
};

export default ConversationPage;
