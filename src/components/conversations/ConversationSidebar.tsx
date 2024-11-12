import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchConversationsThunk } from "../../store/conversationSlice";
import {
  ConversationHeaderSidebar,
  ConversationSidebarContainer,
  ConversationSidebarItem,
  ConversationSidebarStyle,
} from "../../styles/conversations";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { ConversationType } from "../../utils/types";
import CreateConversationModal from "../modals/CreateConversationModal";
import styles from "./index.module.scss";

const ConversationSidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch<AppDispatch>();

  const getDisplayUser = (conversation: ConversationType) => {
    return conversation.creator.id === user?.id
      ? conversation.recipient
      : conversation.creator;
  };

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

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
