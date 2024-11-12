import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
} from "../../styles/messages";
import { postMessageApi } from "../../utils/api";
import { MessageType } from "../../utils/types";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = { messages: MessageType[] };
const MessagePanel = ({ messages }: Props) => {
  const [content, setContent] = useState("");
  const { id } = useParams();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    try {
      await postMessageApi(content, parseInt(id));
      setContent("");
    } catch (error) {
      console.log(error);
    }
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
