import { useNavigate, useParams } from "react-router-dom";
import { ConversationSidebarItemStyle } from "../../styles/conversationSidebar";
import { getRecipientFromConversation } from "../../utils/helpers";
import { ConversationType } from "../../utils/types";
import styles from "./index.module.scss";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useContext } from "react";

type Props = {
  conversation: ConversationType;
};
export const ConversationSibarItem = ({ conversation }: Props) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const getDisplayUser = getRecipientFromConversation(conversation, user);

  return (
    <ConversationSidebarItemStyle
      key={conversation.id}
      onClick={() => navigate(`/conversations/${conversation.id}`)}
      className={parseInt(id!) === conversation.id ? "actived" : ""}
    >
      <div className={styles.conversationAvatar}></div>
      <div>
        <span className={styles.conversationName}>
          {getDisplayUser?.firstName + " " + getDisplayUser?.lastName}
        </span>
        <span className={styles.conversationMessage}>
          <span style={{ fontWeight: "bold", color: "#e2e2e2" }}>
            {`${conversation.lastMessageSent?.author.firstName} ${conversation.lastMessageSent?.author.lastName}: `}
          </span>

          {conversation.lastMessageSent?.content.length >= 25
            ? conversation.lastMessageSent?.content.slice(0, 25) + " ..."
            : conversation.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  );
};
