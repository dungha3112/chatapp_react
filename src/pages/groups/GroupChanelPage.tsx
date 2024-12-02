import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { ConversationChannelPageStyle } from "../../styles/conversations";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { AuthContext } from "../../utils/contexts/AuthContext";

const ConversationChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;

    return () => {};
  }, [id, socket, user?.id]);

  const sendTypingStatus = () => {
    if (!id) return;

    if (isTyping) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          socket.emit("onTypingStop", { conversationId: parseInt(id) });
          setIsTyping(false);
        }, 500)
      );
    } else {
      socket.emit("onTypingStart", { conversationId: parseInt(id) });
      setIsTyping(true);
    }
  };

  return (
    <ConversationChannelPageStyle>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      />
    </ConversationChannelPageStyle>
  );
};

export default ConversationChanelPage;
