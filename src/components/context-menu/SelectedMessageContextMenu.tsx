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
import { ContextMenuItemStyle, ContextMenuSyle } from "../../styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { deleteGroupMessageThunk } from "../../store/groupMessage/groupMessageThunk";
import { selectGroupMessage } from "../../store/groupMessage/groupMessageSlice";
import { editOrDeleteLastMessageGroupSidebar } from "../../store/groups/groupSlice";
import { PointsType } from "../../utils/types";

type Props = {
  points: PointsType;
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
    <ContextMenuSyle $left={points.x} $top={points.y}>
      {selectedMessage?.author.id === user?.id && (
        <ContextMenuItemStyle onClick={handleDeleteMessage}>
          <MdDelete color="#ea0e0e" /> Delete
        </ContextMenuItemStyle>
      )}

      {selectedMessage?.author.id === user?.id && (
        <ContextMenuItemStyle onClick={handleEditMessage}>
          <MdEdit color="#1cee0d" /> Edit
        </ContextMenuItemStyle>
      )}
    </ContextMenuSyle>
  );
};
export default SelectedMessageContextMenu;
