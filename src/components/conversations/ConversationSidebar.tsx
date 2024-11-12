import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  ConversationHeaderSidebar,
  ConversationSidebarContainer,
  ConversationSidebarItem,
  ConversationSidebarStyle,
} from "../../styles/conversations";
import CreateConversationModal from "../modals/CreateConversationModal";
import { ConversationType } from "../../utils/types";
import { getConversationsApi } from "../../utils/api";
import styles from "./index.module.scss";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const ConversationSidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch<AppDispatch>();

  // const [conversations, setConversation] = useState<ConversationType[]>([]);

  const getDisplayUser = (conversation: ConversationType) => {
    return conversation.creator.id === user?.id
      ? conversation.recipient
      : conversation.creator;
  };

  // useEffect(() => {
  //   getConversationsApi()
  //     .then((res) => setConversation(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

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
        {conversations.map((conversation) => (
          <ConversationSidebarItem
            key={conversation.id}
            onClick={() => navigate(`/conversation/${conversation.id}`)}
            className={parseInt(id!) === conversation.id ? "actived" : ""}
          >
            <div className={styles.conversationAvatar}></div>
            <div>
              <span className={styles.conversationName}>
                {getDisplayUser(conversation).firstName +
                  " " +
                  getDisplayUser(conversation).lastName}
              </span>
              <span className={styles.conversationMessage}>
                {conversation.lastMessageSent.content.length >= 25
                  ? conversation.lastMessageSent.content.slice(0, 25) + " ..."
                  : conversation.lastMessageSent.content}
              </span>
            </div>
          </ConversationSidebarItem>
        ))}
      </ConversationSidebarContainer>
    </ConversationSidebarStyle>
  );
};

export default ConversationSidebar;
