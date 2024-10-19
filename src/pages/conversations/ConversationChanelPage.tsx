import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ConversationChanelPageStyle } from "../../styles/conversations";
import { getMessagesByConversationId } from "../../utils/api";
import MessagePanel from "../../components/messages/MessagePanel";

const ConversationChanelPage = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMessagesByConversationId(parseInt(id))
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel></MessagePanel>
    </ConversationChanelPageStyle>
  );
};

export default ConversationChanelPage;
