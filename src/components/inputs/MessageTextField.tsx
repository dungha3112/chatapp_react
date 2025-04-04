import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addAttachment } from "../../store/message-panel/messagePanelSlice";
import { MessageTextarea } from "../../styles/inputs/textarea";
import { useToast } from "../../utils/hooks/useToast";
import { ClipboardEventType, DragEventType } from "../../utils/types";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { useParams } from "react-router-dom";

type Props = {
  message: string;
  setMessage: (s: string) => void;
  maxLength: number;
  sendMessage: () => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};
const MessageTextField = ({
  message,
  setMessage,
  maxLength,
  sendMessage,
  textAreaRef,
}: Props) => {
  const DEFAULT_TEXTAREA_HEIGHT = 20;

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const { error } = useToast();
  const { id } = useParams();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [timerFocus, setTimerFocus] = useState<ReturnType<typeof setTimeout>>();

  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { attachments } = useSelector((state: RootState) => state.messagePanel);

  const handleTyping = () => {
    if (!id) return;
    if (conversationType === "private") {
      if (!isTyping) {
        setIsTyping(true);
        socket.emit("onTypingStart", { id: parseInt(id) });
      }

      if (timer) clearTimeout(timer);

      setTimer(
        setTimeout(() => {
          socket.emit("onTypingStop", { id: parseInt(id) });
          setIsTyping(false);
        }, 2000)
      );
    }
  };

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
    const { current } = textAreaRef;
    if (current) {
      // const height = parseInt(current.style.height);
      current.style.height = "5px";
      current.style.height = current.scrollHeight + "px";
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleTyping();

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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

  const onFocus = () => {
    if (!id) return;

    if (conversationType === "private") {
      if (!isTyping) {
        setIsTyping(true);
        socket.emit("onTypingStart", { id: parseInt(id) });
      }

      if (timerFocus) clearTimeout(timerFocus);

      setTimerFocus(
        setTimeout(() => {
          socket.emit("onTypingStop", { id: parseInt(id) });
          setIsTyping(false);
        }, 6000)
      );
    }
  };

  const onBlur = () => {
    setIsTyping(false);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isTyping) {
        socket.emit("onTypingStop", { id: parseInt(id!) });
        setIsTyping(false);
      }
    };

    const handleBeforeUnload = () => {
      if (isTyping) {
        socket.emit("onTypingStop", { id: parseInt(id!) });
        setIsTyping(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isTyping, socket, id]);

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
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default MessageTextField;
