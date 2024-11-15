import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/conversations/conversationSlice";
import { MessagePanelHeaderStyle } from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";

const MessagePanelHeader = () => {
  const { id: conversationId } = useParams();

  const { user } = useContext(AuthContext);

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(conversationId!))
  );

  const displayName =
    conversation?.creator.id === user?.id
      ? conversation?.recipient.email
      : conversation?.creator.email;

  return <MessagePanelHeaderStyle>{displayName}</MessagePanelHeaderStyle>;
};

export default MessagePanelHeader;
