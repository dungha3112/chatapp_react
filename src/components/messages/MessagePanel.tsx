import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
} from "../../styles/messages";
import UserProfileModal from "../modals/UserProfileModal";
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import MessagePanelHeader from "./MessagePanelHeader";
import MessageAttachmentContainer from "./attachments/MessageAttachmentContainer";

const MessagePanel = () => {
  const { openModalUserProfile } = useSelector(
    (state: RootState) => state.friends
  );
  const { attachments } = useSelector((state: RootState) => state.messagePanel);

  return (
    <>
      {openModalUserProfile && <UserProfileModal />}
      <MessagePanelStyle>
        <MessagePanelHeader />

        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>

        <MessagePanelFooter>
          {attachments.length > 0 && <MessageAttachmentContainer />}

          <MessageInputField />
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  );
};

export default MessagePanel;
