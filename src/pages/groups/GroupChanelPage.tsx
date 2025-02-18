import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { ConversationChannelPageStyle } from "../../styles/conversation";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { AuthContext } from "../../utils/contexts/AuthContext";
import GroupRecipientsSidebar from "../../components/sidebars/group-recipients/GroupRecipientsSidebar";

const GroupChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [isRecipientTyping, setIsRecipientTyping] = useState<boolean>(false);

  useEffect(() => {
    const groupId = parseInt(id!);

    socket.emit("onGroupJoin", { groupId });

    socket.emit("useGroupJoinToClientSide", () => {
      console.log(` user group join ..`);
    });

    return () => {
      socket.emit("onGroupLeave", { groupId });

      socket.off("useGroupJoinToClientSide");
    };
  }, [id, socket]);

  const sendTypingStatus = () => {
    if (!id) return;
  };

  return (
    <>
      <ConversationChannelPageStyle>
        <MessagePanel
          sendTypingStatus={sendTypingStatus}
          isRecipientTyping={isRecipientTyping}
        />
      </ConversationChannelPageStyle>

      <GroupRecipientsSidebar />
    </>
  );
};

export default GroupChanelPage;
