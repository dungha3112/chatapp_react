import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { ConversationChanelPageStyle } from "../../styles/conversations";
import { getMessagesByConversationId } from "../../utils/api";
import { MessageType } from "../../utils/types";

const ConversationChanelPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (id) {
      getMessagesByConversationId(parseInt(id))
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel messages={messages} />
    </ConversationChanelPageStyle>
  );
};

export default ConversationChanelPage;
