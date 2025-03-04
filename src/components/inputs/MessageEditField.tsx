import React, { useEffect, useRef } from "react";
import { MessageTextarea } from "../../styles/inputs/textarea";

type Props = {
  message: string;
  setMessage: (s: string) => void;
  maxLength: number;
  sendMessage: () => void;
};
const MessageEditField = ({
  message,
  setMessage,
  maxLength,
  sendMessage,
}: Props) => {
  const DEFAULT_TEXTAREA_HEIGHT = 20;
  const ref = useRef<HTMLTextAreaElement>(null);

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
    const { current } = ref;
    if (current) {
      current.style.height = "5px";
      current.style.height = current.scrollHeight + "px";
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      const { current } = ref;
      if (current) {
        current.style.height = DEFAULT_TEXTAREA_HEIGHT + "px";
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      const len = ref.current.value.length;
      ref.current.setSelectionRange(len, len);
      ref.current.focus();
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <MessageTextarea
      ref={ref}
      value={message}
      onChange={onMessageChange}
      placeholder="Write something ..."
      maxLength={maxLength}
      onKeyDown={onKeyDown}
    />
  );
};

export default MessageEditField;
