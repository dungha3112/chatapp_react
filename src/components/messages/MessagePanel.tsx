import React, { useContext, useState } from "react";
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
import {
  postNewConversationMessageApi,
  postNewGroupMessageApi,
} from "../../utils/api";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};
const MessagePanel = ({ sendTypingStatus, isRecipientTyping }: Props) => {
  const [content, setContent] = useState("");
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const {
    errorMessage: errorConversationMessage,
    loading: isLoadingConversationMessage,
  } = useSelector((state: RootState) => state.message);

  const { errorMessage: errorGroupMessage, loading: isLoadingGroupMessage } =
    useSelector((state: RootState) => state.groupMessages);

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getRecipientFromConversation(conversation, user);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    if (conversationType === "private") {
      try {
        await postNewConversationMessageApi(content, parseInt(id));
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }

    if (conversationType === "group") {
      try {
        await postNewGroupMessageApi(content, parseInt(id));
        setContent("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoadingConversationMessage || isLoadingGroupMessage)
    return <div>Loading message ..</div>;
  if (errorConversationMessage) return <div>{errorConversationMessage}</div>;
  if (errorGroupMessage) return <div>{errorGroupMessage}</div>;

  return (
    <>
      <MessagePanelStyle>
        <MessagePanelHeader />

        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>

        <MessagePanelFooter>
          <MessageTypingStatusStyle>
            {isRecipientTyping &&
              `${recipient?.firstName} ${recipient?.lastName} is typing...`}
          </MessageTypingStatusStyle>

          <MessageInputFiled
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
          />
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  );
};

export default MessagePanel;
