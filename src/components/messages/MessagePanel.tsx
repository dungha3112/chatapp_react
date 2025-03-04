import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/conversations/conversationSlice";
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
  MessageTypingStatusStyle,
} from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};
const MessagePanel = ({ sendTypingStatus, isRecipientTyping }: Props) => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const { loading: isLoadingConversationMessage } = useSelector(
    (state: RootState) => state.message
  );

  const { loading: isLoadingGroupMessage } = useSelector(
    (state: RootState) => state.groupMessages
  );

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getRecipientFromConversation(conversation, user);

  if (isLoadingConversationMessage || isLoadingGroupMessage)
    return <div>Loading message ..</div>;

  return (
    <>
      <MessagePanelStyle>
        <MessagePanelHeader />

        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>

        <MessagePanelFooter>
          <MessageInputField sendTypingStatus={sendTypingStatus} />

          <MessageTypingStatusStyle>
            {isRecipientTyping &&
              `${recipient?.firstName} ${recipient?.lastName} is typing...`}
          </MessageTypingStatusStyle>
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  );
};

export default MessagePanel;
