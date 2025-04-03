import { useEffect, useState } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";
import { MdGroups } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { tonggleGroupSidebarContextMenu } from "../../store/groups/groupSlice";
import { ButtonIconStyle } from "../../styles";
import {
  ConversationHeaderSidebarStyle,
  ConversationSearchbar,
  ConversationSidebarContainerStyle,
  ConversationSidebarStyle,
} from "../../styles/conversationSidebar";
import GroupSidebarContextMenu from "../context-menu/GroupSidebarContextMenu";
import { ConversationSibarItem } from "../conversations/ConversationSibarItem";
import ConversationTab from "../conversations/ConversationTab";
import GroupItem from "../groups/GroupItem";
import CreateConversationModal from "../modals/CreateConversationModal";
import CreateGroupModal from "../modals/CreateGroupModal";
import { useHandleClick } from "../../utils/hooks";

const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const chatType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const { groups, showGroupContextMenu, points } = useSelector(
    (state: RootState) => state.group
  );
  const handleClick = () => dispatch(tonggleGroupSidebarContextMenu(false));

  useHandleClick(handleClick, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(tonggleGroupSidebarContextMenu(false));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      {showModal && chatType === "private" && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}

      {showModal && chatType === "group" && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}

      {showGroupContextMenu && <GroupSidebarContextMenu points={points} />}

      <ConversationSidebarStyle>
        {/* // Header : Search && Button */}
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

        {/* Conversation Item or Group item */}
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
      </ConversationSidebarStyle>
    </>
  );
};

export default ConversationSidebar;
