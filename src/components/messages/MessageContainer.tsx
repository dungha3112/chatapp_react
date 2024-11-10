import { useContext, useEffect } from "react";
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../styles/messages";
import { MessageType } from "../../utils/types";
import moment from "moment";
import { AuthContext } from "../../utils/contexts/AuthContext";

type Props = { messages: MessageType[] };
const MessageContainer = ({ messages }: Props) => {
  const { user } = useContext(AuthContext);

  const formatMessages = () => {
    return messages.map((m, index, arr) => {
      const current = arr[index];
      const next = arr[index + 1];

      if (arr.length === index + 1) {
        return (
          <MessageItemContainer key={m.id}>
            <MessageItemAvatar />
            <MessageItemDetails>
              <MessageItemHeader>
                <span
                  className="authorName"
                  style={{
                    color: user?.id === m.author.id ? "#757575" : "#5e8bff",
                  }}
                >
                  {m.author.firstName + " " + m.author.lastName}
                </span>
                <span className="time">
                  {moment(m.createdAt).format("MM/DD/YYYY hh:mm A")}
                </span>
              </MessageItemHeader>

              <MessageItemContent>{m.content}</MessageItemContent>
            </MessageItemDetails>
          </MessageItemContainer>
        );
      }

      if (next.author.id === current.author.id) {
        return (
          <MessageItemContainer key={m.id} style={{ padding: "0 0 0 60px" }}>
            <MessageItemContent>{m.content}</MessageItemContent>
          </MessageItemContainer>
        );
      } else {
        return (
          <MessageItemContainer key={m.id}>
            <MessageItemAvatar />
            <MessageItemDetails>
              <MessageItemHeader>
                <span
                  className="authorName"
                  style={{
                    color: user?.id === m.author.id ? "#757575" : "#5e8bff",
                  }}
                >
                  {m.author.firstName + " " + m.author.lastName}
                </span>
                <span className="time">
                  {moment(m.createdAt).format("MM/DD/YYYY hh:mm A")}
                </span>
              </MessageItemHeader>

              <MessageItemContent>{m.content}</MessageItemContent>
            </MessageItemDetails>
          </MessageItemContainer>
        );
      }
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      formatMessages();
    }
  }, [messages]);

  return <MessageContainerStyle>{formatMessages()}</MessageContainerStyle>;
};

export default MessageContainer;
