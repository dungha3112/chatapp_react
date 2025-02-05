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

const ConversationSidebar = () => {
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const { groups } = useSelector((state: RootState) => state.group);
  return (
    <>
      <ConversationSidebarStyle>
        <ConversationHeaderSidebarStyle>
          <ConversationSearchbar placeholder="Search for conversations ..." />
        </ConversationHeaderSidebarStyle>

        <ConversationTab />

        <ConversationSidebarContainerStyle>
          <ConversationSidebarContainerStyle>
            <section>
              {conversationType === "private"
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
