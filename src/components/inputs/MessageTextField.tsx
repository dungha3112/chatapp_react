import React, { SetStateAction } from "react";
import { MessageTextarea } from "../../styles/inputs/textarea";
import { ClipboardEventType, DragEventType } from "../../utils/types";
import { useToast } from "../../utils/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addAttachment } from "../../store/message-panel/messagePanelSlice";

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

  const { error } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { attachments } = useSelector((state: RootState) => state.messagePanel);

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

  const handleFileAdd = (files: FileList) => {
    const maxFilesDropped = 5 - attachments.length;
    if (maxFilesDropped === 0)
      return error("Max files reached", { position: "top-center" });

    const filesArray = Array.from(files).slice(0, maxFilesDropped);

    for (let i = 0; i < filesArray.length; i++) {
      if (filesArray[i].size > 10 * 1024 * 1024) {
        return error(`Size ${filesArray[i].name} > 10mb`, {
          position: "top-center",
        });
      }
      dispatch(addAttachment(filesArray[i]));
    }
  };

  const onDrop = (e: DragEventType) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    handleFileAdd(files);
  };

  const onPaste = (e: ClipboardEventType) => {
    console.log("on paste ..");

    const { files } = e.clipboardData;
    console.log("pasting...");
    handleFileAdd(files);
  };

  return (
    <MessageTextarea
      ref={textAreaRef}
      value={message}
      onChange={onMessageChange}
      placeholder="Write something ..."
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      onDrop={onDrop}
      onPaste={onPaste}
    />
  );
};

export default MessageTextField;
