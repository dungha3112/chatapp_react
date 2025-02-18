import React, { Dispatch, SetStateAction, useState } from "react";
import {
  MessageInputContainer,
  MessageInputStyle,
} from "../../styles/messages";
import styles from "./index.module.scss";

import { IoHappyOutline } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";

import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

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
        <AiFillPlusCircle cursor="pointer" fontSize={30} color="#b8b3b3" />
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
        </form>
        <IoHappyOutline
          cursor="pointer"
          fontSize={30}
          color="#fff"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        />

        {showEmojiPicker && (
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 65,
            }}
          >
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              height={450} // Chiều cao
              width={350} // Chiều rộng
              theme={Theme.DARK}
              skinTonesDisabled
              // disableSearchBar={true}
              reactionsDefaultOpen={true}
            />
          </div>
        )}
      </MessageInputContainer>
    </>
  );
};

export default MessageInputField;
