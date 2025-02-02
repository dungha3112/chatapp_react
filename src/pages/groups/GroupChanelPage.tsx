import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { ConversationChannelPageStyle } from "../../styles/conversation";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { AuthContext } from "../../utils/contexts/AuthContext";

const GroupChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [isRecipientTyping, setIsRecipientTyping] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const groupId: number = parseInt(id);
    socket.emit("onGroupJoin", { groupId });

    return () => {
      socket.emit("onGroupLeave", { groupId });
    };
  }, [id, socket]);

  const sendTypingStatus = () => {
    if (!id) return;
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

export default GroupChanelPage;
