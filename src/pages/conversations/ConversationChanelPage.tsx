import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { ConversationChannelPageStyle } from "../../styles/conversation";
import { SocketContext } from "../../utils/contexts/SocketContext";

const ConversationChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessagesThunk(parseInt(id)));
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;

    socket.emit("onConversationJoin", { id: parseInt(id) });

    socket.on("userLeave", () => {
      console.log("userLeave ");
    });

    socket.on("userConversationJoin", () => {
      console.log("userJoin ");
    });

    return () => {
      socket.emit("onConversationLeave", {
        id: parseInt(id),
      });

      socket.off("userConversationJoin");
      socket.off("userLeave");
    };
  }, [id, socket]);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel />
    </ConversationChannelPageStyle>
  );
};

export default ConversationChanelPage;
