import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import GroupRecipientsSidebar from "../../components/sidebars/group-recipients/GroupRecipientsSidebar";
import { AppDispatch, RootState } from "../../store";
import { ConversationChannelPageStyle } from "../../styles/conversation";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { SocketContext } from "../../utils/contexts/SocketContext";

const GroupChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [isRecipientTyping, setIsRecipientTyping] = useState<boolean>(false);

  const { showSidebar } = useSelector((state: RootState) => state.groupSidebar);

  useEffect(() => {
    const groupId = parseInt(id!);

    socket.emit("onGroupJoin", { groupId });

    socket.emit("userGroupJoin", () => {
      console.log(` user group join ..`);
    });

    return () => {
      socket.emit("onGroupLeave", { groupId });

      // socket.off("userGroupJoin");
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

      {showSidebar && <GroupRecipientsSidebar />}
    </>
  );
};

export default GroupChanelPage;
