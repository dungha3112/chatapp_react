import moment from "moment";
import { useContext } from "react";
import { MessageItemHeaderStyle } from "../../../styles/messages";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import { GroupMessageType, MessageType } from "../../../utils/types";
import Avatar from "../../avatars/Avatar";

type Props = {
  message: MessageType | GroupMessageType;
};
const MessageItemHeader = ({ message }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <MessageItemHeaderStyle>
      <Avatar user={user} size="sm" />

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
    </MessageItemHeaderStyle>
  );
};

export default MessageItemHeader;
