import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
} from "../../styles/messages";
import { postNewMessageApi } from "../../utils/api";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";
import MessagePanelHeader from "./MessagePanelHeader";

const MessagePanel = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    try {
      await postNewMessageApi(content, parseInt(id));
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessagePanelStyle>
      <MessagePanelHeader />

      <MessagePanelBody>
        <MessageContainer />
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
