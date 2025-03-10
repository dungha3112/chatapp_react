import { useRef, useState } from "react";
import { CharacterLimit, MessageInputContainer } from "../../styles/messages";
import styles from "./index.module.scss";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiMiniGif } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  handleOpenFeedIconEditMess,
  handleOpenFeedIconNewMess,
} from "../../store/modals/modalSlice";
import {
  postNewConversationMessageApi,
  postNewGroupMessageApi,
} from "../../utils/api";
import MessageTextField from "../inputs/MessageTextField";

type Props = {
  sendTypingStatus: () => void;
};

const MessageInputField = ({ sendTypingStatus }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState<string>("");

  const [isMultiLine, setIsMultiLine] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const { openFeedIconEditMess, openFeedIconNewMess } = useSelector(
    (state: RootState) => state.modal
  );

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const { id } = useParams();

  const MAX_LENGTH = 2048;
  const atMaxLength = content.length === MAX_LENGTH;

  const ARROW_KEYS = new Set([
    "ArrowUp",
    "ArrowDown",
    "ArrowRight",
    "ArrowLeft",
  ]);

  const sendMessage = async () => {
    if (!content.trim() || !id) return;
    if (conversationType === "private") {
      try {
        await postNewConversationMessageApi(content, parseInt(id));
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }

    if (conversationType === "group") {
      try {
        await postNewGroupMessageApi(content, parseInt(id));
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(handleOpenFeedIconNewMess(false));
  };

  const onEmojiSelect = (emoji: any) => {
    if (!textAreaRef.current) return;

    const cursorPos = textAreaRef.current.selectionStart; // Lấy vị trí con trỏ
    const textBefore = content.substring(0, cursorPos); // Phần trước con trỏ
    const textAfter = content.substring(cursorPos); // Phần sau con trỏ

    // Cập nhật state với emoji được chèn vào vị trí con trỏ
    setContent(textBefore + emoji.native + textAfter);

    // Đặt lại vị trí con trỏ sau emoji
    setTimeout(() => {
      textAreaRef.current!.selectionStart = textAreaRef.current!.selectionEnd =
        cursorPos + emoji.native.length;
      textAreaRef.current!.focus();
    }, 0);

    dispatch(handleOpenFeedIconNewMess(false));
  };

  return (
    <>
      <MessageInputContainer>
        <AiFillPlusCircle className={styles.icon} />

        <form className={styles.form}>
          <MessageTextField
            textAreaRef={textAreaRef}
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
          />
        </form>
        <HiMiniGif
          onClick={() => {
            if (openFeedIconEditMess) {
              dispatch(handleOpenFeedIconEditMess(false));
            }
            dispatch(handleOpenFeedIconNewMess(!openFeedIconNewMess));
          }}
          className={`${styles.icon}  `}
        />

        <CharacterLimit $atMaxLength={atMaxLength}>
          {content.length}/{MAX_LENGTH}
        </CharacterLimit>

        <div className={styles.emojiPicker}>
          {openFeedIconNewMess && (
            <Picker
              className={styles.customPicker}
              showPreview={false}
              theme="dark"
              previewPosition="none"
              searchPosition="none"
              data={data}
              onEmojiSelect={onEmojiSelect}
            />
          )}
        </div>
      </MessageInputContainer>
    </>
  );
};

export default MessageInputField;
