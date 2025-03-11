import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch, RootState } from "../../store";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { ConversationChannelPageStyle } from "../../styles/conversation";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useToast } from "../../utils/hooks/useToast";

const ConversationChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { error } = useToast();

  const { pagination } = useSelector((state: RootState) => state.message);

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const params = { id: parseInt(id), skip: pagination.skip };
    dispatch(fetchMessagesThunk(params))
      .unwrap()
      .catch((err) => console.log(err));
  }, [id, dispatch, pagination]);

  useEffect(() => {
    if (!id) return;

    socket.emit("onConversationJoin", { conversationId: parseInt(id) });

    socket.on("userLeave", () => {
      console.log("userLeave ");
    });

    socket.on("userConversationJoin", () => {
      console.log("userJoin ");
    });

    socket.on("onTypingStart", (payload) => {
      // if (parseInt(id) === parseInt(payload.conversationId)) {
      //   console.log("user start typing ...", payload);
      //   if (user?.id !== payload.userId) {
      //     setIsRecipientTyping(true);
      //   }
      // }
    });

    socket.on("onTypingStop", (payload) => {
      console.log("onTypingStop", payload);

      if (parseInt(id) === parseInt(payload.conversationId)) {
        console.log("user stop typing ...", payload);
        setIsRecipientTyping(false);
      }
    });

    return () => {
      socket.emit("onConversationLeave", {
        conversationId: parseInt(id),
      });

      socket.off("userConversationJoin");
      socket.off("userLeave");

      socket.off("onTypingStart");
      socket.off("onTypingStop");
    };
  }, [id, socket, user?.id]);

  const sendTypingStatus = () => {
    if (!id) return;
    // if (isTyping) {
    //   clearTimeout(timer);
    //   setTimer(
    //     setTimeout(() => {
    //       socket.emit("onTypingStop", { conversationId: parseInt(id) });
    //       setIsTyping(false);
    //     }, 500)
    //   );
    // } else {
    //   socket.emit("onTypingStart", { conversationId: parseInt(id) });
    //   setIsTyping(true);
    // }
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
