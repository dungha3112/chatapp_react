import { useNavigate, useParams } from "react-router-dom";
import { ConversationSidebarItemStyle } from "../../styles/conversationSidebar";
import { GroupType } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  group: GroupType;
};

const GroupItem = ({ group }: Props) => {
  const { id: conversationId } = useParams();
  const navigate = useNavigate();

  return (
    <ConversationSidebarItemStyle
      key={group.id}
      onClick={() => navigate(`/groups/${group.id}`)}
      className={parseInt(conversationId!) === group.id ? "actived" : ""}
    >
      <div className={styles.groupAvatar}></div>
      <div>
        <span className={styles.groupName}>{group.title}</span>
        <span className={styles.groupLastMessage}>
          {group.lastMessageSent?.content.length >= 25
            ? group.lastMessageSent?.content.slice(0, 25) + " ..."
            : group.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  );
};

export default GroupItem;
