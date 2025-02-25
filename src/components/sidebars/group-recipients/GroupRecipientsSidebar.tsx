import React, { useContext, useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import {
  setGroupRecipientContextMenuLocal,
  setSelectedRecipientUser,
  tongleGroupRecipientContextMenu,
} from "../../../store/groupRecipientSidebarSlice";
import { selectGroupById } from "../../../store/groups/groupSlice";
import {
  GroupRecipientsSidebarHeaderStyle,
  GroupRecipientsSidebarItemContainerStyle,
  GroupRecipientsSidebarStyle,
} from "../../../styles/group-recipients/groupRecipientsSidebar";
import { SocketContext } from "../../../utils/contexts/SocketContext";
import { UserType } from "../../../utils/types";
import SelectedParticipantContextMenu from "../../context-menu/SelectedParticipantContextMenu";
import OfflineGroupRecipients from "./OfflineGroupRecipients";
import OnlineGroupRecipients from "./OnlineGroupRecipients";

const GroupRecipientsSidebar = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserType[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<UserType[]>([]);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  const { showSidebar, showUserContextMenu, points } = useSelector(
    (state: RootState) => state.groupSidebar
  );

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

  useEffect(() => {
    const handleClick = () => dispatch(tongleGroupRecipientContextMenu(false));
    window.addEventListener("click", handleClick);

    return () => {
      console.log("UnClick ...");
      window.removeEventListener("click", handleClick);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => dispatch(tongleGroupRecipientContextMenu(false));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const onContextMenu = (event: React.MouseEvent, user: UserType) => {
    event.preventDefault();
    let x = event.pageX;
    let y = event.pageY;

    const targetElement = event.currentTarget as HTMLElement; // width of online-offline OfflineGroupRecipients
    const itemWidth = targetElement.offsetWidth; // Độ rộng thực tế của item
    const itemLeft = targetElement.getBoundingClientRect().left; // Vị trí của item
    const relativeX = x - itemLeft; // Vị trí chuột bên trong item

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const width = 180; // width of  SelectedParticipantContextMenu , take ref
    const height = 188; // height of  SelectedParticipantContextMenu , take ref

    if (itemWidth === 264 && relativeX < (itemWidth * 2) / 3) {
      x -= (180 * 1) / 2; // Dịch sang trái khoảng 120px
    }

    if (x + width > screenWidth) {
      x = screenWidth - width - 30;
    }

    // Kiểm tra nếu menu tràn ra ngoài dưới
    if (y + height > screenHeight) {
      y = screenHeight - height - 30;
    }
    dispatch(setGroupRecipientContextMenuLocal({ x, y }));

    dispatch(tongleGroupRecipientContextMenu(true));
    dispatch(setSelectedRecipientUser(user));
  };

  return (
    <GroupRecipientsSidebarStyle $showSidebar={showSidebar}>
      <GroupRecipientsSidebarHeaderStyle>
        <span>Particpants ({group?.users.length})</span>
        <MdGroups size={20} />
      </GroupRecipientsSidebarHeaderStyle>

      <GroupRecipientsSidebarItemContainerStyle>
        <span className="titleOnOffline">
          Online Users ({onlineUsers.length})
        </span>
        <OnlineGroupRecipients
          users={onlineUsers}
          onUserContextMenu={onContextMenu}
        />
        <span className="titleOnOffline">
          Offline Users ({offlineUsers.length})
        </span>
        <OfflineGroupRecipients
          users={offlineUsers}
          onUserContextMenu={onContextMenu}
        />

        {showUserContextMenu && (
          <SelectedParticipantContextMenu points={points} />
        )}
      </GroupRecipientsSidebarItemContainerStyle>
    </GroupRecipientsSidebarStyle>
  );
};

export default GroupRecipientsSidebar;
