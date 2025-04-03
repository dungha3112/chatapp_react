import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { MessageItemContent } from "../../../styles/messages";
import EditMessageContainer from "../EditMessageContainer";
import MessageItemAttachmentContainer from "../attachments/MessageItemAttachmentContainer";
import { GroupMessageType, MessageType } from "../../../utils/types";
import moment from "moment";

type Props = {
  m: MessageType | GroupMessageType;
  onEditMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  padding: string;
};
const MessageItemContainerBody = ({
  m,
  onEditMessageChange,
  padding,
}: Props) => {
  const { isEditingMessage, messageBegingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  return (
    <div title={moment(m.createdAt).format("MM/DD/YYYY hh:mm A")}>
      {isEditingMessage && m.id === messageBegingEdited?.id ? (
        <MessageItemContent $padding={padding}>
          <EditMessageContainer
            onEditMessageChange={onEditMessageChange}
            key={m.id}
          />
        </MessageItemContent>
      ) : (
        <MessageItemContent $padding={padding}>
          {m.content || null}
          <MessageItemAttachmentContainer message={m} />
        </MessageItemContent>
      )}
    </div>
  );
};

export default MessageItemContainerBody;
