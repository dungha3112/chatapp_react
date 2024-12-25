import { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { deleteMessageThunk } from "../../store/messages/messageThunk";
import { ContextMenuSyle } from "../../styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import {
  handleSetIsEditingMessage,
  handleSetMessageBegingEdited,
} from "../../store/messageContainerSlice";

type Props = {
  points: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ points }: Props) => {
  const { messageBegingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteMessage = async () => {
    if (!messageBegingEdited || !id) return;

    await dispatch(
      deleteMessageThunk({
        conversationId: parseInt(id),
        messageId: messageBegingEdited.id,
      })
    );
  };

  const handleEditMessage = async () => {
    if (!messageBegingEdited || !id) return;
    dispatch(handleSetMessageBegingEdited(messageBegingEdited));
    dispatch(handleSetIsEditingMessage(true));
  };

  return (
    <>
      {user?.id === messageBegingEdited?.author.id && (
        <ContextMenuSyle $left={points.x} $top={points.y}>
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
