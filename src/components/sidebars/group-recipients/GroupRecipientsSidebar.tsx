import { MdGroups } from "react-icons/md";
import {
  GroupRecipientsSidebarItemContainerStyle,
  GroupRecipientsSidebarHeaderStyle,
  GroupRecipientsSidebarStyle,
  GroupRecipientItemSidebarStyle,
} from "../../../styles/group-recipients/groupRecipientsSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { selectGroupById } from "../../../store/groups/groupSlice";
import { useParams } from "react-router-dom";
import { MessageItemAvatar } from "../../../styles/messages";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../utils/contexts/SocketContext";

const GroupRecipientsSidebar = () => {
  const socket = useContext(SocketContext);
  const { id: groupId } = useParams();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!))
  );

  useEffect(() => {
    socket.emit("getOnlineGroupUsers", { groupId });
    const interval = setInterval(() => {
      socket.emit("getOnlineGroupUsers", { groupId });
    }, 5000);

    return () => {
      clearInterval(interval);
      socket.off("getOnlineGroupUsers");
    };
  }, [groupId, socket]);

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeaderStyle>
        <span>Particpants ({group?.users.length})</span>
        <MdGroups size={20} />
      </GroupRecipientsSidebarHeaderStyle>

      <GroupRecipientsSidebarItemContainerStyle>
        {group?.users.map((user) => (
          <GroupRecipientItemSidebarStyle key={user.id}>
            <MessageItemAvatar />
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </GroupRecipientItemSidebarStyle>
        ))}
      </GroupRecipientsSidebarItemContainerStyle>
    </GroupRecipientsSidebarStyle>
  );
};

export default GroupRecipientsSidebar;
