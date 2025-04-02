import React from "react";
import { GroupMessageType, MessageType } from "../../../utils/types";

type Props = {
  message: MessageType | GroupMessageType;
};

const MessageItemAttachmentContainer = ({ message }: Props) => {
  return <div>MessageItemAttachmentContainer</div>;
};

export default MessageItemAttachmentContainer;
