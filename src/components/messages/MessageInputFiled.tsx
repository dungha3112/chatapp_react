import React, { Dispatch, SetStateAction } from "react";
import {
  MessageInputContainer,
  MessageInputStyle,
} from "../../styles/messages";
import styles from "./index.module.scss";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

const MessageInputFiled = ({ content, setContent, sendMessage }: Props) => {
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {};

  return (
    <MessageInputContainer>
      <form onSubmit={sendMessage} className={styles.form}>
        <MessageInputStyle
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleOnKeyDown}
        />
      </form>
    </MessageInputContainer>
  );
};

export default MessageInputFiled;
