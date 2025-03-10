import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useRef } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiMiniGif } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { editOrDeleteLastMessageConversationSidebar } from "../../store/conversations/conversationSlice";
import { editGroupMessageThunk } from "../../store/groupMessage/groupMessageThunk";
import { editOrDeleteLastMessageGroupSidebar } from "../../store/groups/groupSlice";
import { handleSetIsEditingMessage } from "../../store/messageContainerSlice";
import { editConversationMessageThunk } from "../../store/messages/messageThunk";
import {
  handleOpenFeedIconEditMess,
  handleOpenFeedIconNewMess,
} from "../../store/modals/modalSlice";
import {
  CharacterLimit,
  EditMessageActionsContainer,
  MessageInputContainer,
} from "../../styles/messages";
import { GroupMessageType, MessageType } from "../../utils/types";
import MessageEditField from "../inputs/MessageEditField";
import styles from "./index.module.scss";

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const EditMessageContainer = ({ onEditMessageChange }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams();
  const { messageBegingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const MAX_LENGTH = 2048;
  const atMaxLength = messageBegingEdited?.content.length === MAX_LENGTH;
  const dispatch = useDispatch<AppDispatch>();

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const { openFeedIconEditMess, openFeedIconNewMess } = useSelector(
    (state: RootState) => state.modal
  );

  /**
   * check ? :
   */
  if (!id || !messageBegingEdited) return;

  const sendMessage = async () => {
    if (!id || !messageBegingEdited.content.trim()) return;
    if (conversationType === "private") {
      const params = {
        conversationId: parseInt(id),
        messageId: messageBegingEdited.id,
        content: messageBegingEdited.content,
      };
      dispatch(editConversationMessageThunk(params))
        .unwrap()
        .then(() => {
          dispatch(handleSetIsEditingMessage(false));
          dispatch(handleOpenFeedIconEditMess(false));
          dispatch(
            editOrDeleteLastMessageConversationSidebar({
              isEdit: true,
              messages: [],
              conversationId: parseInt(id),
              message: messageBegingEdited as MessageType,
            })
          );
        })
        .catch((err) => console.log(err));
    }

    if (conversationType === "group") {
      const params = {
        groupId: parseInt(id),
        messageId: messageBegingEdited.id,
        content: messageBegingEdited.content,
      };
      dispatch(editGroupMessageThunk(params))
        .unwrap()
        .then(() => {
          dispatch(handleSetIsEditingMessage(false));

          dispatch(
            editOrDeleteLastMessageGroupSidebar({
              isEdit: true,
              messages: [],
              groupId: parseInt(id),
              message: messageBegingEdited as GroupMessageType,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const onEmojiSelect = (emoji: any) => {
    if (!textAreaRef.current) return;

    const cursorPos = textAreaRef.current.selectionStart; // Lấy vị trí con trỏ
    const textBefore = messageBegingEdited.content.substring(0, cursorPos); // Phần trước con trỏ
    const textAfter = messageBegingEdited.content.substring(cursorPos); // Phần sau con trỏ

    // Cập nhật state với emoji được chèn vào vị trí con trỏ

    const s = textBefore + emoji.native + textAfter;
    onEditMessageChange({
      target: { value: s },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    // Đặt lại vị trí con trỏ sau emoji
    setTimeout(() => {
      textAreaRef.current!.selectionStart = textAreaRef.current!.selectionEnd =
        cursorPos + emoji.native.length;
      textAreaRef.current!.focus();
    }, 0);

    dispatch(handleOpenFeedIconEditMess(false));
  };

  return (
    <>
      <MessageInputContainer>
        <AiFillPlusCircle className={styles.icon} />
        <form className={styles.form}>
          <MessageEditField
            textAreaRef={textAreaRef}
            message={messageBegingEdited.content}
            setMessage={(s) =>
              onEditMessageChange({
                target: { value: s },
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }
            maxLength={2048}
            sendMessage={sendMessage}
          />

          <EditMessageActionsContainer>
            <div>
              escape to <span>cancel</span> - enter to <span>save</span>
            </div>
          </EditMessageActionsContainer>
        </form>

        <HiMiniGif
          onClick={() => {
            if (openFeedIconNewMess) {
              dispatch(handleOpenFeedIconNewMess(false));
            }
            dispatch(handleOpenFeedIconEditMess(!openFeedIconEditMess));
          }}
          className={`${styles.icon}  `}
        />

        <CharacterLimit $atMaxLength={atMaxLength}>
          {messageBegingEdited.content.length}/{MAX_LENGTH}
        </CharacterLimit>

        <div className={styles.emojiPicker}>
          {openFeedIconEditMess && (
            <Picker
              className={styles.customPicker}
              theme="dark"
              previewPosition="none"
              searchPosition="none"
              showPreview={false}
              data={data}
              onEmojiSelect={onEmojiSelect}
            />
          )}
        </div>
      </MessageInputContainer>
    </>
  );
};

export default EditMessageContainer;
