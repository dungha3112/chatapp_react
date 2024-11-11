import React, { Dispatch, SetStateAction } from "react";
import {
  MessageInputContainer,
  MessageInputStyle,
} from "../../styles/messages";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

const MessageInputFiled = ({ content, setContent, sendMessage }: Props) => {
  return (
    <MessageInputContainer>
      <form onSubmit={sendMessage}>
        <MessageInputStyle
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </MessageInputContainer>
  );
};

export default MessageInputFiled;
