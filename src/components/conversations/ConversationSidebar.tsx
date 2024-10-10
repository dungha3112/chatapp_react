import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  ConversationHeaderSidebar,
  ConversationSidebarContainer,
  ConversationSidebarStyle,
} from "../../styles/conversations";
import CreateConversationModal from "../modals/CreateConversationModal";
import { ConversationType } from "../../utils/types";
import { getConversationsApi } from "../../utils/api";

const ConversationSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [conversations, setConversation] = useState<ConversationType[]>([]);

  useEffect(() => {
    getConversationsApi()
      .then((res) => setConversation(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(conversations[0]);

  return (
    <ConversationSidebarStyle>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <ConversationHeaderSidebar>
        <h1>Conversations</h1>
        <div onClick={() => setShowModal(true)}>
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
