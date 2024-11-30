import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchConversationsThunk } from "../../store/conversations/conversationThunk";
import {
  ConversationHeaderSidebar,
  ConversationSidebarContainer,
  ConversationSidebarStyle,
} from "../../styles/conversations";
import CreateConversationModal from "../modals/CreateConversationModal";

import { fetchGroupsThunk } from "../../store/groups/groupThunk";
import ConversationSelected from "./ConversationSelected";
import { ConversationSibarItem } from "./ConversationSibarItem";
import GroupItem from "../groups/GroupItem";

const ConversationSidebar = () => {
  const currentChatType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const groups = useSelector((state: RootState) => state.group.groups);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGroupsThunk());
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
        <ConversationSelected />
        <section>
          {currentChatType === "private"
            ? conversations.map((conversation) => (
                <ConversationSibarItem
                  conversation={conversation}
                  key={conversation.id}
                />
              ))
            : groups.map((group) => <GroupItem group={group} key={group.id} />)}
        </section>
      </ConversationSidebarContainer>
    </ConversationSidebarStyle>
  );
};

export default ConversationSidebar;
