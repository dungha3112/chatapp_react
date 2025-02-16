import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { handleSetIsEditingMessage } from "../../store/messageContainerSlice";
import { editConversationMessageThunk } from "../../store/messages/messageThunk";
import {
  EditMessageActionsContainer,
  EditMessageInputField,
} from "../../styles/messages";
import { editOrDeleteLastMessageConversationSidebar } from "../../store/conversations/conversationSlice";
import { GroupMessageType, MessageType } from "../../utils/types";
import { editGroupMessageThunk } from "../../store/groupMessage/groupMessageThunk";
import { editOrDeleteLastMessageGroupSidebar } from "../../store/groups/groupSlice";

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditMessageContainer = ({ onEditMessageChange }: Props) => {
  const { id } = useParams();
  const { messageBegingEdited, isEditingMessage } = useSelector(
    (state: RootState) => state.messageContainer
  );

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
    <div style={{ width: "100%" }}>
      <form onSubmit={onSubmit}>
        <EditMessageInputField
          value={messageBegingEdited.content}
          onChange={onEditMessageChange}
          autoFocus={isEditingMessage}
        />

        <EditMessageActionsContainer>
          <div>
            escape to <span>cancel</span> - enter to <span>save</span>
          </div>
        </EditMessageActionsContainer>
      </form>
    </div>
  );
};

export default EditMessageContainer;
