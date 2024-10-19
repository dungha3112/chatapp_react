import React from "react";
import { MessagePanelStyle } from "../../styles/messages";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";

const MessagePanel = () => {
  return (
    <MessagePanelStyle>
      <MessageContainer />

      <MessageInputFiled />
    </MessagePanelStyle>
  );
};

export default MessagePanel;
