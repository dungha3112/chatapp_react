import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { editOrDeleteLastMessageConversationSidebar } from "../../store/conversations/conversationSlice";
import { editGroupMessageThunk } from "../../store/groupMessage/groupMessageThunk";
import { editOrDeleteLastMessageGroupSidebar } from "../../store/groups/groupSlice";
import { handleSetIsEditingMessage } from "../../store/messageContainerSlice";
import { editConversationMessageThunk } from "../../store/messages/messageThunk";
import {
  CharacterLimit,
  EditMessageActionsContainer,
  MessageInputContainer,
} from "../../styles/messages";
import { GroupMessageType, MessageType } from "../../utils/types";
import MessageEditField from "../inputs/MessageEditField";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiMiniGif } from "react-icons/hi2";
import styles from "./index.module.scss";

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const EditMessageContainer = ({ onEditMessageChange }: Props) => {
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

  /**
   * check ? :
   */
  if (!id || !messageBegingEdited) return;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (conversationType === "private") {
    //   const params = {
    //     conversationId: parseInt(id),
    //     messageId: messageBegingEdited.id,
    //     content: messageBegingEdited.content,
    //   };
    //   dispatch(editConversationMessageThunk(params))
    //     .unwrap()
    //     .then(() => {
    //       dispatch(handleSetIsEditingMessage(false));

    //       dispatch(
    //         editOrDeleteLastMessageConversationSidebar({
    //           isEdit: true,
    //           messages: [],
    //           conversationId: parseInt(id),
    //           message: messageBegingEdited as MessageType,
    //         })
    //       );
    //     })
    //     .catch((err) => console.log(err));
    // }

    // if (conversationType === "group") {
    //   const params = {
    //     groupId: parseInt(id),
    //     messageId: messageBegingEdited.id,
    //     content: messageBegingEdited.content,
    //   };
    //   dispatch(editGroupMessageThunk(params))
    //     .unwrap()
    //     .then(() => {
    //       dispatch(handleSetIsEditingMessage(false));

    //       dispatch(
    //         editOrDeleteLastMessageGroupSidebar({
    //           isEdit: true,
    //           messages: [],
    //           groupId: parseInt(id),
    //           message: messageBegingEdited as GroupMessageType,
    //         })
    //       );
    //     })
    //     .catch((err) => console.log(err));
    // }
  };

  const onSubmitEditMessage = async () => {
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

  return (
    <MessageInputContainer>
      <AiFillPlusCircle className={styles.icon} />
      <form onSubmit={onSubmit} className={styles.form}>
        <MessageEditField
          message={messageBegingEdited.content}
          setMessage={(s) =>
            onEditMessageChange({
              target: { value: s },
            } as React.ChangeEvent<HTMLTextAreaElement>)
          }
          maxLength={2048}
          sendMessage={onSubmitEditMessage}
        />

        <EditMessageActionsContainer>
          <div>
            escape to <span>cancel</span> - enter to <span>save</span>
          </div>
        </EditMessageActionsContainer>
      </form>

      <HiMiniGif
        onClick={() => console.log(123)}
        className={`${styles.icon}  `}
      />

      <CharacterLimit $atMaxLength={atMaxLength}>
        {messageBegingEdited.content.length}/{MAX_LENGTH}
      </CharacterLimit>
    </MessageInputContainer>
  );
};

export default EditMessageContainer;
