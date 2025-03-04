import { useState } from "react";
import { CharacterLimit, MessageInputContainer } from "../../styles/messages";
import styles from "./index.module.scss";

import { AiFillPlusCircle } from "react-icons/ai";
import { HiMiniGif } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import {
  postNewConversationMessageApi,
  postNewGroupMessageApi,
} from "../../utils/api";
import MessageTextField from "../inputs/MessageTextField";

type Props = {
  sendTypingStatus: () => void;
};

const MessageInputField = ({ sendTypingStatus }: Props) => {
  const [content, setContent] = useState<string>("");
  const [isMultiLine, setIsMultiLine] = useState<boolean>(false);

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
    if (!content || !id) return;
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
  };

  return (
    <>
      <MessageInputContainer>
        <AiFillPlusCircle className={styles.icon} />

        <form className={styles.form}>
          <MessageTextField
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
          />
        </form>
        <HiMiniGif
          onClick={() => console.log(123)}
          className={`${styles.icon}  `}
        />

        <CharacterLimit $atMaxLength={atMaxLength}>
          {content.length}/{MAX_LENGTH}
        </CharacterLimit>
      </MessageInputContainer>
    </>
  );
};

export default MessageInputField;
