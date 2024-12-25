import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { selectGroupMessage } from "../../store/groupMessage/groupMessageSlice";
import { selectConversationMessage } from "../../store/messages/messageSlice";
import {
  MessageContainerStyle,
  MessageItemContainer,
  MessageItemContent,
} from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { MessageType } from "../../utils/types";
import SelectedMessageContextMenu from "../context-menu/SelectedMessageContextMenu";
import EditMessageContainer from "./EditMessageContainer";
import FormatedMessage from "./FormatedMessage";

const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [points, setPoints] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const { isEditingMessage, selectedMessage, messageBegingEdited } =
    useSelector((state: RootState) => state.messageContainer);

  const conversationMessage = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );

  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditingMessage) return;
  };

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mess: MessageType
  ) => {
    e.preventDefault();
    setShowMenu(true);
    setPoints({ x: e.pageX, y: e.pageY });
    // setSelectMessage(mess);
  };

  const mapMessages = (
    m: MessageType,
    index: number,
    messages: MessageType[]
  ) => {
    const nextIndex = index + 1;
    const currentMessage = messages[index];
    const nextMessage = messages[nextIndex];

    if (
      messages.length === nextIndex ||
      currentMessage.author.id != nextMessage.author.id
    ) {
      return (
        <FormatedMessage
          onContextMenu={(e) => onContextMenu(e, m)}
          key={m.id}
          user={user}
          message={m}
          onEditMessageChange={onEditMessageChange}
        />
      );
    }
    if (currentMessage.author.id === nextMessage.author.id) {
      return (
        <MessageItemContainer
          key={m.id}
          onContextMenu={(e) => onContextMenu(e, m)}
        >
          {isEditingMessage && m.id === messageBegingEdited?.id ? (
            <MessageItemContent $padding="0 0 0 60px">
              <EditMessageContainer
                onEditMessageChange={onEditMessageChange}
                key={m.id}
              />
            </MessageItemContent>
          ) : (
            <MessageItemContent $padding="0 0 0 60px">
              {m.content}
            </MessageItemContent>
          )}
        </MessageItemContainer>
      );
    }
  };

  const formatMessages = () => {
    if (conversationType === "private") {
      return conversationMessage?.messages.map(mapMessages);
    }

    return [];
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
    <MessageContainerStyle>
      {formatMessages()}

      {showMenu && <SelectedMessageContextMenu points={points} />}
    </MessageContainerStyle>
  );
};

export default MessageContainer;
