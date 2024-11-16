import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { fetchMessagesThunk } from "../../store/messages/messageThunk";
import { ConversationChanelPageStyle } from "../../styles/conversations";

const ConversationChanelPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchMessagesThunk(parseInt(id)));
    }
  }, [id, dispatch]);

  const sendTypingStatus = () => {};

  return (
    <ConversationChanelPageStyle>
      <MessagePanel sendTypingStatus={sendTypingStatus} />
    </ConversationChanelPageStyle>
  );
};

export default ConversationChanelPage;
