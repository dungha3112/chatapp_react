import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { ConversationChanelPageStyle } from "../../styles/conversations";
import { SocketContext } from "../../utils/contexts/SocketContext";

const ConversationChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessagesThunk(parseInt(id)));
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;

    socket.emit("onConversationJoin", { conversationId: parseInt(id) });

    socket.on("userLeaveToClientSide", () => {
      console.log("userLeaveToClientSide");
    });

    socket.on("userJoinToClientSide", () => {
      console.log("userJoinToClientSide");
    });

    socket.on("onTypingStopToClientSide", () => {
      console.log("user stop typing ...");
      setIsRecipientTyping(false);
    });

    socket.on("onTypingStartToClientSide", () => {
      console.log("user typing ...");
      setIsRecipientTyping(true);
    });

    return () => {
      socket.off("onConversationJoin");
      socket.emit("onConversationLeave", {
        conversationId: parseInt(id),
      });

      socket.off("userJoinToClientSide");
      socket.off("userLeaveToClientSide");

      socket.off("onTypingStartToClientSide");
      socket.off("onTypingStopToClientSide");
    };
  }, [id, socket]);

  const sendTypingStatus = () => {
    if (!id) return;

    if (isTyping) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          setIsTyping(false);
          socket.emit("onTypingStop", { conversationId: parseInt(id) });
        }, 2000)
      );
    } else {
      setIsTyping(true);
      socket.emit("onTypingStart", { conversationId: parseInt(id) });
    }
  };

  return (
    <ConversationChanelPageStyle>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      />
    </ConversationChanelPageStyle>
  );
};

export default ConversationChanelPage;
