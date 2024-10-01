import React from "react";
import { ConversationSidebarStyle } from "../../styles/conversations";
import { FiEdit } from "react-icons/fi";
const ConversationSidebar = () => {
  return (
    <ConversationSidebarStyle>
      <header>
        <h1>Conversations</h1>
        <div>
          <FiEdit size={24} />
        </div>
      </header>
    </ConversationSidebarStyle>
  );
};

export default ConversationSidebar;
