import {
  ConversationHeaderSidebar,
  ConversationSidebarContainer,
  ConversationSidebarItem,
  ConversationSidebarStyle,
} from "../../styles/conversations";
import { FiEdit } from "react-icons/fi";
// import conversations from "../../__mocks/conversations";
import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router-dom";

const ConversationSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <ConversationSidebarStyle>
      <ConversationHeaderSidebar>
        <h1>Conversations</h1>
        <div>
          <FiEdit size={24} />
        </div>
      </ConversationHeaderSidebar>

      <ConversationSidebarContainer>
        {/* {conversations.map((conversation) => (
          <ConversationSidebarItem
            key={conversation.id}
            onClick={() => navigate(`/conversation/${conversation.id}`)}
            className={parseInt(id!) === conversation.id ? "actived" : ""}
          >
            <div className={styles.conversationAvatar}></div>
            <div>
              <span className={styles.conversationName}>
                {conversation.firstName + " " + conversation.lastName}
              </span>
              <span className={styles.conversationMessage}>
                {conversation.lastMessageSent}
              </span>
            </div>
          </ConversationSidebarItem>
        ))} */}
      </ConversationSidebarContainer>
    </ConversationSidebarStyle>
  );
};

export default ConversationSidebar;
