import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { selectGroupMessage } from "../../store/groupMessage/groupMessageSlice";
import { tongleGroupRecipientContextMenu } from "../../store/groupRecipientSidebarSlice";
import { tonggleGroupSidebarContextMenu } from "../../store/groups/groupSlice";
import {
  handleResetMessageContainter,
  handleSelectedMessage,
  handleSetIsEditingMessage,
  handleUpdateMessageContentBegingEdited,
} from "../../store/messageContainerSlice";
import { selectConversationMessage } from "../../store/messages/messageSlice";
import {
  handleOpenFeedIconEditMess,
  handleOpenFeedIconNewMess,
} from "../../store/modals/modalSlice";
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
} from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";
import {
  ContextMenuEventType,
  GroupMessageType,
  MessageType,
} from "../../utils/types";
import SelectedMessageContextMenu from "../context-menu/SelectedMessageContextMenu";
import MessageItemAttachmentContainer from "./attachments/MessageItemAttachmentContainer";
import EditMessageContainer from "./EditMessageContainer";
import MessageItemHeader from "./MessageItemHeader";

import avatarDefault from "../../assets/default_avatar.jpg";

const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [points, setPoints] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const { isEditingMessage, messageBegingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const conversationMessage = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );

  const groupMessage = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const onEditMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isEditingMessage) return;
    dispatch(handleUpdateMessageContentBegingEdited(e.target.value));
  };

  useEffect(() => {
    const handleClick = () => setShowMenu(false);

    window.addEventListener("click", handleClick);

    return () => {
      console.log("UnClick ...");
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) =>
      e.key === "Escape" &&
      (dispatch(handleSetIsEditingMessage(false)),
      dispatch(handleOpenFeedIconEditMess(false)),
      dispatch(tonggleGroupSidebarContextMenu(false)),
      dispatch(tongleGroupRecipientContextMenu(false)),
      dispatch(handleOpenFeedIconNewMess(false)));
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      console.log("Removing keydown listenner ...");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      console.log("Unmuseting ...");

      dispatch(handleResetMessageContainter());
    };
  }, [id, dispatch]);

  const onContextMenu = (e: ContextMenuEventType, mess: MessageType) => {
    e.preventDefault();
    if (mess.author.id !== user?.id) return;

    setShowMenu(true);
    setPoints({ x: e.pageX, y: e.pageY });
    dispatch(handleSelectedMessage(mess));
  };

  const mapMessages = (
    m: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[]
  ) => {
    const nextIndex = index + 1;
    const currentMessage = messages[index];
    const nextMessage = messages[nextIndex];

    const urlAvatar = m.author.profile?.avatar?.secure_url
      ? m.author.profile?.avatar?.secure_url
      : avatarDefault;

    if (
      messages.length === nextIndex ||
      currentMessage.author.id != nextMessage.author.id
    ) {
      return (
        <MessageItemContainer onContextMenu={(e) => onContextMenu(e, m)}>
          <MessageItemAvatar $url={urlAvatar} />

          <MessageItemDetails>
            <MessageItemHeader message={m} />

            {isEditingMessage && m.id === messageBegingEdited?.id ? (
              <MessageItemContent style={{ padding: "0 0 0 7px" }}>
                <EditMessageContainer
                  onEditMessageChange={onEditMessageChange}
                />
              </MessageItemContent>
            ) : (
              <MessageItemContent style={{ padding: "0 0 0 7px" }}>
                {m.content || null}

                <MessageItemAttachmentContainer message={m} />
              </MessageItemContent>
            )}
          </MessageItemDetails>
        </MessageItemContainer>
      );
    }

    if (currentMessage.author.id === nextMessage.author.id) {
      return (
        <MessageItemContainer
          key={m.id}
          onContextMenu={(e) => onContextMenu(e, m)}
        >
          {isEditingMessage && m.id === messageBegingEdited?.id ? (
            <MessageItemContent $padding="8px 0 0 0">
              <EditMessageContainer
                onEditMessageChange={onEditMessageChange}
                key={m.id}
              />
            </MessageItemContent>
          ) : (
            <MessageItemContent $padding="8px 0 0 0">
              {m.content || null}
              <MessageItemAttachmentContainer message={m} />
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

    if (conversationType === "group") {
      return groupMessage?.messages.map(mapMessages);
    }
  };

  useEffect(() => {
    formatMessages();
  }, []);

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleScroll = () => {
    if (!ref.current) return;

    // const previousHeight = container.scrollHeight;
    // setTimeout(() => {
    //   container.scrollTop = container.scrollHeight - previousHeight;
    // }, 100);
  };

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MessageContainerStyle ref={ref}>
      {formatMessages()}

      {showMenu && <SelectedMessageContextMenu points={points} />}
    </MessageContainerStyle>
  );
};

export default MessageContainer;
