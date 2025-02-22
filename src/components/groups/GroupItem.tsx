import { useNavigate, useParams } from "react-router-dom";
import { ConversationSidebarItemStyle } from "../../styles/conversationSidebar";
import { GroupType } from "../../utils/types";
import styles from "./index.module.scss";
import { tonggleSidebar } from "../../store/groupRecipientSidebarSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

type Props = {
  group: GroupType;
};

const GroupItem = ({ group }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ConversationSidebarItemStyle
      key={group.id}
      onClick={() => {
        navigate(`/groups/${group.id}`);
        // dispatch(tonggleSidebar(false));
      }}
      className={parseInt(id!) === group.id ? "actived" : ""}
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
          group?.lastMessageSent?.content.length >= 25
            ? group?.lastMessageSent?.content.slice(0, 25) + " ..."
            : group?.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  );
};

export default GroupItem;
