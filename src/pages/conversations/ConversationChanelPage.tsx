import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { ConversationChanelPageStyle } from "../../styles/conversations";
import { getMessagesByConversationId } from "../../utils/api";
import { MessageEventPayload, MessageType } from "../../utils/types";
import { SocketContext } from "../../utils/contexts/SocketContext";

const ConversationChanelPage = () => {
  const socket = useContext(SocketContext);

  const { id } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (id) {
      getMessagesByConversationId(parseInt(id))
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    socket.on("connected", () => {
      console.log("Connected ...");
    });
    socket.on("createMessageToClientSide", (payload: MessageEventPayload) => {
      console.log(payload);
      if (parseInt(id!) === payload.conversation.id) {
        setMessages((prev) => [payload.message, ...prev]);
      }
    });
    return () => {
      socket.off("connected");
      socket.off("createMessageToClientSide");
    };
  }, [socket, id]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel messages={messages} />
    </ConversationChanelPageStyle>
  );
};

export default ConversationChanelPage;
