import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
} from "../../styles/messages";
import { MessageType } from "../../utils/types";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = { messages: MessageType[] };
const MessagePanel = ({ messages }: Props) => {
  return (
    <MessagePanelStyle>
      <MessagePanelHeader />

      <MessagePanelBody>
        <MessageContainer messages={messages} />
      </MessagePanelBody>

      <MessagePanelFooter>
        <MessageInputFiled />
      </MessagePanelFooter>
    </MessagePanelStyle>
  );
};

export default MessagePanel;
