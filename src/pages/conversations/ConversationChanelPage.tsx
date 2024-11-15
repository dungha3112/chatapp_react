import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { updateConversation } from "../../store/conversationSlice";
import { addMessage } from "../../store/messages/messageSlice";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { ConversationChanelPageStyle } from "../../styles/conversations";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { MessageEventPayload } from "../../utils/types";

const ConversationChanelPage = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchMessagesThunk(parseInt(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    socket.on("connected", () => {
      console.log("Connected ...");
    });
    socket.on("createMessageToClientSide", (payload: MessageEventPayload) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload.conversation));
    });
    return () => {
      socket.off("connected");
      socket.off("createMessageToClientSide");
    };
  }, [socket, dispatch]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel />
    </ConversationChanelPageStyle>
  );
};

export default ConversationChanelPage;
