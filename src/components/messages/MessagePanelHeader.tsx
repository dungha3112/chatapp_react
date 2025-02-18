import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/conversations/conversationSlice";
import { selectGroupById } from "../../store/groups/groupSlice";
import { MessagePanelHeaderStyle } from "../../styles/messages";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { BsPersonAdd } from "react-icons/bs";
import { ButtonIconStyle } from "../../styles";
import AddGroupRecipientModal from "../modals/AddGroupRecipientModal";

const MessagePanelHeader = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { id: conversationId } = useParams();

  const { user } = useContext(AuthContext);
  const conversationType = useSelector(
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
  const headerTitle = conversationType === "group" ? groupTitle : displayName;

  return (
    <>
      {showModal && (
        <AddGroupRecipientModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <MessagePanelHeaderStyle>
        <div>{headerTitle}</div>

        {conversationType === "group" && (
          <ButtonIconStyle
            className={showModal ? "actived" : ""}
            onClick={() => setShowModal(true)}
          >
            <BsPersonAdd fontSize={20} />
          </ButtonIconStyle>
        )}
      </MessagePanelHeaderStyle>
    </>
  );
};

export default MessagePanelHeader;
