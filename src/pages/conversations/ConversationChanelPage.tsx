import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { ConversationChannelPageStyle } from "../../styles/conversation";
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
    dispatch(fetchMessagesThunk(parseInt(id)));
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;

    socket.emit("onConversationJoin", { conversationId: parseInt(id) });

    socket.on("userLeaveToClientSide", () => {
      console.log("userLeave ");
    });

    socket.on("userJoinToClientSide", () => {
      console.log("userJoin ");
    });

    socket.on("onTypingStartToClientSide", (payload) => {
      if (parseInt(id) === parseInt(payload.conversationId)) {
        console.log("user start typing ...", payload);
        if (user?.id !== payload.userId) {
          setIsRecipientTyping(true);
        }
      }
    });

    socket.on("onTypingStopToClientSide", (payload) => {
      console.log("onTypingStopToClientSide", payload);

      if (parseInt(id) === parseInt(payload.conversationId)) {
        console.log("user stop typing ...", payload);
        setIsRecipientTyping(false);
      }
    });

    return () => {
      socket.emit("onConversationLeave", {
        conversationId: parseInt(id),
      });

      socket.off("userJoinToClientSide");
      socket.off("userLeaveToClientSide");

      socket.off("onTypingStartToClientSide");
      socket.off("onTypingStopToClientSide");
    };
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
      ></MessagePanel>
    </ConversationChannelPageStyle>
  );
};

export default ConversationChanelPage;
