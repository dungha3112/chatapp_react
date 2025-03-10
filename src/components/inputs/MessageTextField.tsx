import React, { SetStateAction } from "react";
import { MessageTextarea } from "../../styles/inputs/textarea";

type Props = {
  message: string;
  setMessage: (s: string) => void;
  maxLength: number;
  setIsMultiLine: React.Dispatch<SetStateAction<boolean>>;
  sendTypingStatus: () => void;
  sendMessage: () => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};
const MessageTextField = ({
  message,
  setMessage,
  maxLength,
  setIsMultiLine,
  sendTypingStatus,
  sendMessage,
  textAreaRef,
}: Props) => {
  const DEFAULT_TEXTAREA_HEIGHT = 20;

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
    const { current } = textAreaRef;
    if (current) {
      const height = parseInt(current.style.height);
      current.style.height = "5px";
      current.style.height = current.scrollHeight + "px";
      if (height > DEFAULT_TEXTAREA_HEIGHT) {
        setIsMultiLine(true);
      } else {
        setIsMultiLine(false);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    sendTypingStatus();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      setIsMultiLine(false);
      const { current } = textAreaRef;
      if (current) {
        current.style.height = DEFAULT_TEXTAREA_HEIGHT + "px";
      }
    }
  };

  return (
    <MessageTextarea
      ref={textAreaRef}
      value={message}
      onChange={onMessageChange}
      placeholder="Write something ..."
      maxLength={maxLength}
      onKeyDown={onKeyDown}
    />
  );
};

export default MessageTextField;
