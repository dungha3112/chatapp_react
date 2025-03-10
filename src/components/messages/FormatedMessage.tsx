import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../styles/messages";
import {
  ContextMenuEventType,
  GroupMessageType,
  MessageType,
  UserType,
} from "../../utils/types";
import EditMessageContainer from "./EditMessageContainer";

type Props = {
  user?: UserType;
  message: MessageType | GroupMessageType;
  onContextMenu: (e: ContextMenuEventType) => void;
  onEditMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const FormatedMessage = ({
  user,
  message,
  onContextMenu,
  onEditMessageChange,
}: Props) => {
  const { isEditingMessage, messageBegingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
      <MessageItemAvatar />
      <MessageItemDetails>
        <span
          className="authorName"
          style={{
            color: user?.id === message.author.id ? "#989898" : "#5e8bff",
          }}
        >
          {message.author.firstName} {message.author.lastName}
        </span>

        <span className="time">
          {moment(message.createdAt).format("MM/DD/YYYY hh:mm A")}
        </span>

        <MessageItemHeader>
          {isEditingMessage && message.id === messageBegingEdited?.id ? (
            <MessageItemContent style={{ padding: "8px 0 0 0" }}>
              <EditMessageContainer onEditMessageChange={onEditMessageChange} />
            </MessageItemContent>
          ) : (
            <MessageItemContent>{message.content}</MessageItemContent>
          )}
        </MessageItemHeader>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};

export default FormatedMessage;
