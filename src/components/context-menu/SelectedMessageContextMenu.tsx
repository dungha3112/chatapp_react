import { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { editOrDeleteLastMessageConversationSidebar } from "../../store/conversations/conversationSlice";
import {
  handleSetIsEditingMessage,
  handleSetMessageBegingEdited,
} from "../../store/messageContainerSlice";
import { selectConversationMessage } from "../../store/messages/messageSlice";
import { deleteConversationMessageThunk } from "../../store/messages/messageThunk";
import { ContextMenuSyle } from "../../styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { deleteGroupMessageThunk } from "../../store/groupMessage/groupMessageThunk";
import { selectGroupMessage } from "../../store/groupMessage/groupMessageSlice";
import { editOrDeleteLastMessageGroupSidebar } from "../../store/groups/groupSlice";

type Props = {
  points: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ points }: Props) => {
  const { selectedMessage } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const conversationMessage = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );

  const groupMessage = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );

  const handleDeleteMessage = async () => {
    if (!selectedMessage || !id) return;

    if (conversationType === "private") {
      await dispatch(
        deleteConversationMessageThunk({
          conversationId: parseInt(id),
          messageId: selectedMessage.id,
        })
      );
      dispatch(
        editOrDeleteLastMessageConversationSidebar({
          isEdit: false,
          conversationId: Number(conversationMessage?.id),
          messages: conversationMessage?.messages.slice(0, 2),
          message: selectedMessage,
        })
      );
    }

    if (conversationType === "group") {
      await dispatch(
        deleteGroupMessageThunk({
          groupId: parseInt(id),
          messageId: selectedMessage.id,
        })
      );
      dispatch(
        editOrDeleteLastMessageGroupSidebar({
          isEdit: false,
          groupId: Number(groupMessage?.id),
          messages: groupMessage?.messages.slice(0, 2),
          message: selectedMessage,
        })
      );
    }
  };

  const handleEditMessage = async () => {
    if (!selectedMessage || !id) return;
    dispatch(handleSetIsEditingMessage(true));
    dispatch(handleSetMessageBegingEdited(selectedMessage));
  };

  return (
    <>
      {user?.id === selectedMessage?.author.id && (
        <ContextMenuSyle
          $left={points.x}
          $top={points.y}
          style={{ zIndex: "10000" }}
        >
          <ul>
            <li onClick={handleDeleteMessage}>
              <MdDelete color="red" fontSize={20} /> Delete
            </li>

            <li onClick={handleEditMessage}>
              <MdEdit color="blue" fontSize={20} /> Edit
            </li>
          </ul>
        </ContextMenuSyle>
      )}
    </>
  );
};

export default SelectedMessageContextMenu;
