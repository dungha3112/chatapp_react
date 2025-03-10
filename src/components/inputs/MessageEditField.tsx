import React, { useEffect } from "react";
import { MessageTextarea } from "../../styles/inputs/textarea";

type Props = {
  message: string;
  setMessage: (s: string) => void;
  maxLength: number;
  sendMessage: () => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};
const MessageEditField = ({
  message,
  setMessage,
  maxLength,
  sendMessage,
  textAreaRef,
}: Props) => {
  const DEFAULT_TEXTAREA_HEIGHT = 20;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setMessage(value);

    // Đợi React cập nhật state, sau đó đặt lại vị trí con trỏ
    const { current } = textAreaRef;
    if (current) {
      current.style.height = "5px";
      current.style.height = current.scrollHeight + "px";
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      const { current } = textAreaRef;
      if (current) {
        current.style.height = DEFAULT_TEXTAREA_HEIGHT + "px";
      }
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd } = textAreaRef.current; // Lưu vị trí con trỏ hiện tại

      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
      }, 0);
      // Khôi phục vị trí con trỏ
      setTimeout(() => {
        textAreaRef.current?.setSelectionRange(selectionStart, selectionEnd);
      }, 0);
    }
  }, [textAreaRef, message]);

  return (
    <MessageTextarea
      ref={textAreaRef}
      value={message}
      onChange={onChange}
      placeholder="Write something ..."
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      autoFocus={true}
    />
  );
};

export default MessageEditField;
