import React, { useContext, useEffect, useState } from "react";
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
  MessageItemContainer,
  MessageItemDetails,
} from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";
import {
  ContextMenuEventType,
  GroupMessageType,
  MessageType,
  PointsType,
} from "../../utils/types";
import SelectedMessageContextMenu from "../context-menu/SelectedMessageContextMenu";
import MessageItemHeader from "./messageItems/MessageItemHeader";

import { useHandleClick, useKeydown } from "../../utils/hooks";
import UserTyping from "../typings";
import MessageItemContainerBody from "./messageItems/MessageItemContainerBody";

const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [points, setPoints] = useState<PointsType>({ x: 0, y: 0 });

  const { isEditingMessage } = useSelector(
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

  const conversationsTyping = useSelector(
    (state: RootState) => state.conversation.conversationsTyping
  );

  const conversationIsTyping = conversationsTyping.find(
    (cv) => cv.id === parseInt(id!)
  );

  const onEditMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isEditingMessage) return;
    dispatch(handleUpdateMessageContentBegingEdited(e.target.value));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      dispatch(handleSetIsEditingMessage(false));
      dispatch(handleOpenFeedIconEditMess(false));
      dispatch(tonggleGroupSidebarContextMenu(false));
      dispatch(tongleGroupRecipientContextMenu(false));
      dispatch(handleOpenFeedIconNewMess(false));
      setShowMenu(false);
    }
  };
  const handleClick = () => setShowMenu(false);

  useKeydown(handleKeyDown, [id]);
  useHandleClick(handleClick, [id]);

  useEffect(() => {
    return () => {
      dispatch(handleResetMessageContainter());
    };
  }, [id, dispatch]);

  const onContextMenu = (e: ContextMenuEventType, mess: MessageType) => {
    e.preventDefault();
    if (mess.author.id !== user?.id) return;

    let x = e.pageX;
    let y = e.pageY;

    const targetElement = e.currentTarget as HTMLElement;
    const itemWidth = targetElement.offsetWidth;
    const itemLeft = targetElement.getBoundingClientRect().left;
    const relativeX = x - itemLeft;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const width = 180; // width of SelectedParticipantContextMenu
    const height = 188; // height of SelectedParticipantContextMenu

    // Điều chỉnh nếu menu bị tràn ra khỏi màn hình
    if (itemWidth === 264 && relativeX < (itemWidth * 2) / 3) {
      x -= width / 2; // Chỉ giảm một phần nhỏ thay vì 120px cứng nhắc
    }

    if (x + width > screenWidth) {
      x = screenWidth - width - 10; // Tránh tràn phải
    }
    if (x < 0) {
      x = 10; // Tránh tràn trái
    }

    if (y + height > screenHeight) {
      y = screenHeight - height - 10; // Tránh tràn dưới
    }
    if (y < 0) {
      y = 10; // Tránh tràn trên
    }

    // Dùng giá trị x, y đã chỉnh sửa
    setPoints({ x, y });
    dispatch(handleSelectedMessage(mess));
    setShowMenu(true);
  };
  const mapMessages = (
    m: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[]
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const showMessageHeader =
      messages.length === index + 1 ||
      currentMessage.author.id !== nextMessage.author.id;

    return (
      <MessageItemContainer
        onContextMenu={(e) => onContextMenu(e, m)}
        key={m.id}
      >
        {showMessageHeader && <MessageItemHeader message={m} />}
        {showMessageHeader ? (
          <MessageItemDetails>
            <MessageItemContainerBody
              padding="0 0 0 45px"
              m={m}
              onEditMessageChange={onEditMessageChange}
              key={m.id}
            />
          </MessageItemDetails>
        ) : (
          <MessageItemDetails>
            <MessageItemContainerBody
              padding="0 0 0 45px"
              m={m}
              onEditMessageChange={onEditMessageChange}
              key={m.id}
            />
          </MessageItemDetails>
        )}
      </MessageItemContainer>
    );
  };

  return (
    <MessageContainerStyle
      onScroll={(e) => {
        const node = e.target as HTMLDivElement;
        const scrollTopMax = node.scrollHeight - node.clientHeight;

        if (node.scrollTop === scrollTopMax) {
          console.log("Đã cuộn xuống dưới cùng!");
        }

        if (-Math.round(scrollTopMax) === Math.round(node.scrollTop)) {
          console.log("?????");
        }
      }}
    >
      {conversationIsTyping?.isTyping && (
        <UserTyping
          isAvatar={true}
          userTyping={conversationIsTyping.userTyping}
        />
      )}

      <>
        {conversationType === "private"
          ? conversationMessage?.messages.map(mapMessages)
          : groupMessage?.messages.map(mapMessages)}
      </>
      {showMenu && <SelectedMessageContextMenu points={points} />}
    </MessageContainerStyle>
  );
};

export default MessageContainer;
