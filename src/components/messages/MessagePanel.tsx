import React from "react";
import { MessagePanelStyle } from "../../styles/messages";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";
import { MessageType } from "../../utils/types";

type Props = { messages: MessageType[] };
const MessagePanel = ({ messages }: Props) => {
  return (
    <MessagePanelStyle>
      <MessageContainer messages={messages} />

      <MessageInputFiled />
    </MessagePanelStyle>
  );
};

export default MessagePanel;
