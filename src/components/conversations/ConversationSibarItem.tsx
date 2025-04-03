import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConversationSidebarItemStyle } from "../../styles/conversationSidebar";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import { ConversationType } from "../../utils/types";
import Avatar from "../avatars/Avatar";
import styles from "./index.module.scss";

type Props = {
  conversation: ConversationType;
};
export const ConversationSibarItem = ({ conversation }: Props) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const recipient = getRecipientFromConversation(conversation, user);

  return (
    <ConversationSidebarItemStyle
      key={conversation.id}
      onClick={() => navigate(`/conversations/${conversation.id}`)}
      $selected={parseInt(id!) === conversation.id}
    >
      <Avatar user={recipient} size="md" />

      <div>
        <span className={styles.conversationName}>
          {recipient?.firstName + " " + recipient?.lastName}
        </span>
        <span className={styles.conversationMessage}>
          <span style={{ fontWeight: "bold", color: "#e2e2e2" }}>
            {conversation?.lastMessageSent &&
              `${conversation?.lastMessageSent?.author.firstName} ${conversation?.lastMessageSent?.author.lastName}: `}
          </span>

          {conversation?.lastMessageSent &&
          conversation?.lastMessageSent.content &&
          conversation?.lastMessageSent?.content.length > 15
            ? conversation?.lastMessageSent?.content.slice(0, 15) + " ..."
            : conversation?.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  );
};
