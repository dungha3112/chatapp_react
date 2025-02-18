import { useContext, useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { selectGroupById } from "../../../store/groups/groupSlice";
import {
  GroupRecipientsSidebarHeaderStyle,
  GroupRecipientsSidebarItemContainerStyle,
  GroupRecipientsSidebarStyle,
} from "../../../styles/group-recipients/groupRecipientsSidebar";
import { SocketContext } from "../../../utils/contexts/SocketContext";
import { UserType } from "../../../utils/types";
import OfflineGroupRecipients from "./OfflineGroupRecipients";
import OnlineGroupRecipients from "./OnlineGroupRecipients";

const GroupRecipientsSidebar = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserType[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<UserType[]>([]);

  const socket = useContext(SocketContext);

  const { id } = useParams();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  useEffect(() => {
    socket.emit("getOnlineGroupUsers", { groupId: parseInt(id!) });

    const interval = setInterval(() => {
      socket.emit("getOnlineGroupUsers", { groupId: parseInt(id!) });
    }, 5000);

    socket.on("onlineGroupUsersReceived", (payload) => {
      const { onlineUsers, offlineUsers } = payload;
      setOnlineUsers(onlineUsers);
      setOfflineUsers(offlineUsers);
    });

    return () => {
      clearInterval(interval);
      socket.off("onlineGroupUsersReceived");
    };
  }, [id, socket]);

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeaderStyle>
        <span>Particpants ({group?.users.length})</span>
        <MdGroups size={20} />
      </GroupRecipientsSidebarHeaderStyle>

      <GroupRecipientsSidebarItemContainerStyle>
        <span className="titleOnOffline">Online Users</span>
        <OnlineGroupRecipients users={onlineUsers} />

        <span className="titleOnOffline">Offline Users</span>
        <OfflineGroupRecipients users={offlineUsers} />
      </GroupRecipientsSidebarItemContainerStyle>
    </GroupRecipientsSidebarStyle>
  );
};

export default GroupRecipientsSidebar;
