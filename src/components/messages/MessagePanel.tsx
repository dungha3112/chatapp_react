import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
  MessageTypingStatusStyle,
} from "../../styles/messages";
import { postNewMessageApi } from "../../utils/api";
import MessageContainer from "./MessageContainer";
import MessageInputFiled from "./MessageInputFiled";
import MessagePanelHeader from "./MessagePanelHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/conversations/conversationSlice";
import { getRecipientFromConversation } from "../../utils/helpers";
import { AuthContext } from "../../utils/contexts/AuthContext";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};
const MessagePanel = ({ sendTypingStatus, isRecipientTyping }: Props) => {
  const [content, setContent] = useState("");
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getRecipientFromConversation(conversation, user);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    try {
      await postNewMessageApi(content, parseInt(id));
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MessagePanelStyle>
        <MessagePanelHeader />

        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>

        <MessagePanelFooter>
          <MessageInputFiled
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
          />

          <MessageTypingStatusStyle>
            {isRecipientTyping
              ? `${recipient?.firstName} ${recipient?.lastName} is typing...`
              : ""}
          </MessageTypingStatusStyle>
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  );
};

export default MessagePanel;
