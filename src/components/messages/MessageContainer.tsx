import { MessageContainerStyle } from "../../styles/messages";
import { MessageType } from "../../utils/types";

type Props = { messages: MessageType[] };
const MessageContainer = ({ messages }: Props) => {
  return (
    <MessageContainerStyle>
      {messages.map((m) => (
        <div>{m.content}</div>
      ))}
    </MessageContainerStyle>
  );
};

export default MessageContainer;
