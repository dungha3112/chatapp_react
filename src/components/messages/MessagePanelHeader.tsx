import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/conversations/conversationSlice";
import { selectGroupById } from "../../store/groups/groupSlice";
import { MessagePanelHeaderStyle } from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";

const MessagePanelHeader = () => {
  const { id: conversationId } = useParams();

  const { user } = useContext(AuthContext);
  const currentChatType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const { id: groupId } = useParams();

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(conversationId!))
  );

  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!))
  );

  const displayName =
    conversation?.creator.id === user?.id
      ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
      : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`;

  const groupTitle = group?.title || "Group";
  const headerTitle = currentChatType === "group" ? groupTitle : displayName;

  return <MessagePanelHeaderStyle>{headerTitle}</MessagePanelHeaderStyle>;
};

export default MessagePanelHeader;
