import moment from "moment";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useParams } from "react-router-dom";

const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const conversationMessages = useSelector((state: RootState) => state.message);

  const message = conversationMessages.messages.find(
    (m) => m.id === parseInt(id!)
  );

  const formatMessages = () => {
    return message?.messages.map((m, index, arr) => {
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
    formatMessages();
  }, []);

  return <MessageContainerStyle>{formatMessages()}</MessageContainerStyle>;
};

export default MessageContainer;
