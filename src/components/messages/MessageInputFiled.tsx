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
  sendTypingStatus: () => void;
};

const MessageInputFiled = ({
  content,
  setContent,
  sendMessage,
  sendTypingStatus,
}: Props) => {
  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    sendTypingStatus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault();
  };

  return (
    <>
      <MessageInputContainer>
        <form onSubmit={sendMessage} className={styles.form}>
          <MessageInputStyle
            value={content}
            onChange={changeContent}
            onKeyDown={onKeyDown}
          />
        </form>
      </MessageInputContainer>
    </>
  );
};

export default MessageInputFiled;
