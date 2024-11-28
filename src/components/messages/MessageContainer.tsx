import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { MessageContextMenu } from "../../utils/contexts/MessageContextMenu";
import { MessageType } from "../../utils/types";
import SelectedMessageContextMenu from "../context-menu/SelectedMessageContextMenu";

const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [points, setPoints] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [selectMessage, setSelectMessage] = useState<MessageType | null>(null);
  const [isEditMessage, setIsEditMessage] = useState<boolean>(false);

  const conversationMessages = useSelector((state: RootState) => state.message);

  const message = conversationMessages.messages.find(
    (m) => m.id === parseInt(id!)
  );

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mess: MessageType
  ) => {
    e.preventDefault();
    setShowMenu(true);
    setPoints({ x: e.pageX, y: e.pageY });
    setSelectMessage(mess);
  };

  const formatMessages = () => {
    return message?.messages.map((m, index, arr) => {
      const current = arr[index];
      const next = arr[index + 1];

      if (arr.length === index + 1) {
        return (
          <MessageItemContainer
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
          >
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

              {isEditMessage && messageContext?.id === m.id ? (
                <input placeholder="edit message ..." />
              ) : (
                <MessageItemContent>{m.content}</MessageItemContent>
              )}
            </MessageItemDetails>
          </MessageItemContainer>
        );
      }

      if (next.author.id === current.author.id) {
        return (
          <MessageItemContainer
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
            style={{ padding: "0 0 0 60px" }}
          >
            {isEditMessage ? (
              <input placeholder="edit message ..." />
            ) : (
              <MessageItemContent>{m.content}</MessageItemContent>
            )}
          </MessageItemContainer>
        );
      } else {
        return (
          <MessageItemContainer
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
          >
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

              {isEditMessage ? (
                <input placeholder="edit message ..." />
              ) : (
                <MessageItemContent>{m.content}</MessageItemContent>
              )}
            </MessageItemDetails>
          </MessageItemContainer>
        );
      }
    });
  };

  useEffect(() => {
    formatMessages();
  }, []);

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <MessageContextMenu.Provider
      value={{
        message: selectMessage,
        setMessage: setSelectMessage,
        setIsEditMessage: setIsEditMessage,
        editMessage: selectMessage,
        setEditMessage: setSelectMessage,
      }}
    >
      <MessageContainerStyle>
        {formatMessages()}

        {showMenu && <SelectedMessageContextMenu points={points} />}
      </MessageContainerStyle>
    </MessageContextMenu.Provider>
  );
};

export default MessageContainer;
