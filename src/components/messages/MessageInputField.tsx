import React, { Dispatch, SetStateAction, useState } from "react";
import {
  MessageInputContainer,
  MessageInputStyle,
} from "../../styles/messages";
import styles from "./index.module.scss";

import { AiFillPlusCircle, AiOutlineFileGif } from "react-icons/ai";
import { EmojiClickData } from "emoji-picker-react";
import MessageTextField from "../inputs/MessageTextField";
import { ImHappy } from "react-icons/im";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  sendTypingStatus: () => void;
};

const MessageInputField = ({
  content,
  setContent,
  sendMessage,
  sendTypingStatus,
}: Props) => {
  const ARROW_KEYS = new Set([
    "ArrowUp",
    "ArrowDown",
    "ArrowRight",
    "ArrowLeft",
  ]);

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [cursonPosition, setCursonPosition] = useState<number>(-1);

  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    sendTypingStatus();
    setCursonPosition(Number(e.target.selectionStart));
  };

  const onEmojiClick = (data: EmojiClickData) => {
    setContent(
      (prev) =>
        prev.slice(0, cursonPosition) + data.emoji + prev.slice(cursonPosition)
    );
  };

  return (
    <>
      <MessageInputContainer>
        <AiFillPlusCircle className={styles.icon} />
        <form onSubmit={sendMessage} className={styles.form}>
          <MessageInputStyle
            placeholder="Write to ..."
            value={content}
            onChange={changeContent}
            onKeyDown={(e) => {
              sendTypingStatus();

              if (e.target instanceof HTMLInputElement) {
                if (ARROW_KEYS.has(e.key)) {
                  setCursonPosition(Number(e.target.selectionStart));
                }
              }
            }}
            maxLength={4000}
            onMouseUp={(e) => {
              if (e.target instanceof HTMLInputElement) {
                setCursonPosition(Number(e.target.selectionStart));
              }
            }}
          />

          {/* <MessageTextField /> */}
        </form>
        <AiOutlineFileGif className={styles.icon} />
        <ImHappy className={styles.icon} />
      </MessageInputContainer>
    </>
  );
};

export default MessageInputField;
