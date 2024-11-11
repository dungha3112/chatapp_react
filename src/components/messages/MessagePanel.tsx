import React, { useState } from "react";
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
} from "../../styles/messages";
import { MessageType } from "../../utils/types";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = { messages: MessageType[] };
const MessagePanel = ({ messages }: Props) => {
  const [content, setContent] = useState("");

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(123);
  };

  return (
    <MessagePanelStyle>
      <MessagePanelHeader />

      <MessagePanelBody>
        <MessageContainer messages={messages} />
      </MessagePanelBody>

      <MessagePanelFooter>
        <MessageInputFiled
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
        />
      </MessagePanelFooter>
    </MessagePanelStyle>
  );
};

export default MessagePanel;
