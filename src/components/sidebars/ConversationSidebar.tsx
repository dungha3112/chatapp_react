import { useSelector } from "react-redux";
import {
  ConversationHeaderSidebarStyle,
  ConversationSearchbar,
  ConversationSidebarContainerStyle,
  ConversationSidebarStyle,
} from "../../styles/conversationSidebar";
import { ConversationSibarItem } from "../conversations/ConversationSibarItem";
import ConversationTab from "../conversations/ConversationTab";
import GroupItem from "../groups/GroupItem";
import { RootState } from "../../store";
import { LuMessageSquarePlus } from "react-icons/lu";
import { MdGroups } from "react-icons/md";
import { useState } from "react";
import CreateConversationModal from "../modals/CreateConversationModal";
import { ButtonIconStyle } from "../../styles";
import CreateGroupModal from "../modals/CreateGroupModal";

const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const chatType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const { groups } = useSelector((state: RootState) => state.group);

  return (
    <>
      {showModal && chatType === "private" && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}

      {showModal && chatType === "group" && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}

      <ConversationSidebarStyle>
        <ConversationHeaderSidebarStyle>
          <ConversationSearchbar placeholder="Search for conversations ..." />

          <ButtonIconStyle
            className={showModal ? "actived" : ""}
            onClick={() => setShowModal(true)}
          >
            {chatType === "group" ? (
              <MdGroups size={20} />
            ) : (
              <LuMessageSquarePlus size={20} />
            )}
          </ButtonIconStyle>
        </ConversationHeaderSidebarStyle>

        <ConversationTab />

        <ConversationSidebarContainerStyle>
          <ConversationSidebarContainerStyle>
            <section>
              {chatType === "private"
                ? conversations.map((conversation) => (
                    <ConversationSibarItem
                      conversation={conversation}
                      key={conversation.id}
                    />
                  ))
                : groups.map((group) => (
                    <GroupItem group={group} key={group.id} />
                  ))}
            </section>
          </ConversationSidebarContainerStyle>
        </ConversationSidebarContainerStyle>

        <footer style={{ backgroundColor: "#fff" }}>Hello</footer>
      </ConversationSidebarStyle>
    </>
  );
};

export default ConversationSidebar;
