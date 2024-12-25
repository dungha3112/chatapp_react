import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  EditMessageInputField,
  EditMessageActionsContainer,
} from "../../styles/messages";
import { editMessageThunk } from "../../store/messages/messageThunk";
import { handleSetIsEditingMessage } from "../../store/messageContainerSlice";

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditMessageContainer = ({ onEditMessageChange }: Props) => {
  const { id } = useParams();
  const { messageBegingEdited } = useSelector(
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
    // if (!id || !messageBegingEdited) return;

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
