import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  ConversationHeaderSidebar,
  ConversationSidebarContainer,
  ConversationSidebarStyle,
} from "../../styles/conversations";
import CreateConversationModal from "../modals/CreateConversationModal";

import GroupItem from "../groups/GroupItem";
import ConversationSelected from "./ConversationSelected";
import { ConversationSibarItem } from "./ConversationSibarItem";

const ConversationSidebar = () => {
  const currentChatType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const groups = useSelector((state: RootState) => state.group.groups);

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
