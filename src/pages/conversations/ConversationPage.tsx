import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import { AppDispatch, RootState } from "../../store";
import {
  addConversation,
  editOrDeleteLastMessageConversationSidebar,
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
import { SocketContext } from "../../utils/contexts/SocketContext";
import {
  ConversationType,
  MessageEventPayload,
  MessageType,
} from "../../utils/types";
import ConversationPanel from "../../components/conversations/ConversationPanel";

const ConversationPage = () => {
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

    socket.on("onConversationCreate", (payload: ConversationType) => {
      dispatch(addConversation(payload));
    });

    socket.on("onMessageCreate", (payload: MessageEventPayload) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload.conversation));
    });

    return () => {
      socket.off("connected");
      socket.off("disconnected");
      socket.off("onConversationCreate");
      socket.off("onMessageCreate");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on("onMessageDelete", (payload: MessageType) => {
      dispatch(deleteMessage(payload));
      dispatch(
        editOrDeleteLastMessageConversationSidebar({
          isEdit: false,
          messages: conversationMessage?.messages.slice(0, 2),
          conversationId: Number(payload.conversation?.id),
          message: payload as MessageType,
        })
      );
    });

    socket.on("onMessageEdit", (payload: MessageType) => {
      console.log("Message Edit", payload);
      dispatch(editMessage(payload));

      dispatch(
        editOrDeleteLastMessageConversationSidebar({
          isEdit: true,
          messages: [],
          conversationId: Number(payload.conversation?.id),
          message: payload,
        })
      );
    });

    return () => {
      socket.off("onMessageDelete");
      socket.off("onMessageEdit");
    };
  }, [conversationMessage?.messages, dispatch, socket]);

  return (
    <>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  );
};

export default ConversationPage;
