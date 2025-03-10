import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import {
  setGroupSidebarContextMenuLocal,
  setSelectedGroupContextMenu,
  tonggleGroupSidebarContextMenu,
} from "../../store/groups/groupSlice";
import { ConversationSidebarItemStyle } from "../../styles/conversationSidebar";
import { ContextMenuEventType, GroupType } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  group: GroupType;
};

const GroupItem = ({ group }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onUserContextMenu = (e: ContextMenuEventType) => {
    e.preventDefault();
    let x = e.pageX;
    let y = e.pageY;
    const padding = 10;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const width = 180; // width of  GroupContextMenu , take ref
    const height = 134; // height of  GroupContextMenu , take ref

    if (x + width > screenWidth) {
      x = screenWidth - width - padding;
    }

    if (y + height > screenHeight) {
      y = screenHeight - height - padding;
    }

    dispatch(tonggleGroupSidebarContextMenu(true));
    dispatch(setGroupSidebarContextMenuLocal({ x, y }));
    dispatch(setSelectedGroupContextMenu(group));
  };

  return (
    <ConversationSidebarItemStyle
      key={group.id}
      onClick={() => navigate(`/groups/${group.id}`)}
      $selected={parseInt(id!) === group.id}
      onContextMenu={(e) => onUserContextMenu(e)}
    >
      <div className={styles.groupAvatar}></div>
      <div>
        <span className={styles.groupName}>{group.title}</span>
        <span className={styles.groupLastMessage}>
          <span style={{ fontWeight: "bold", color: "#e2e2e2" }}>
            {group?.lastMessageSent &&
              `${group?.lastMessageSent?.author.firstName} ${group?.lastMessageSent?.author.lastName}: `}
          </span>

          {group?.lastMessageSent &&
          group?.lastMessageSent?.content.length >= 15
            ? group?.lastMessageSent?.content.slice(0, 15) + " ..."
            : group?.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  );
};

export default GroupItem;
