import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { handleSetIsEditingMessage } from "../../store/messageContainerSlice";
import { editMessageThunk } from "../../store/messages/messageThunk";
import {
  EditMessageActionsContainer,
  EditMessageInputField,
} from "../../styles/messages";
import { editOrDeleteLastMessageConversation } from "../../store/conversations/conversationSlice";
import { MessageType } from "../../utils/types";

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

    const params = {
      conversationId: parseInt(id),
      messageId: messageBegingEdited.id,
      content: messageBegingEdited.content,
    };
    if (conversationType === "private") {
      dispatch(editMessageThunk(params))
        .unwrap()
        .finally(() => {
          dispatch(handleSetIsEditingMessage(false));

          dispatch(
            editOrDeleteLastMessageConversation({
              isEdit: true,
              messages: [],
              conversationId: parseInt(id),
              message: messageBegingEdited as MessageType,
            })
          );
        });
    } else {
      dispatch(handleSetIsEditingMessage(false));
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
