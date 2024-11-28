import { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { deleteMessageThunk } from "../../store/messages/messageThunk";
import { ContextMenuSyle } from "../../styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { MessageContextMenu } from "../../utils/contexts/MessageContextMenu";

type Props = {
  points: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ points }: Props) => {
  const { message, setEditMessage, setIsEditMessage } =
    useContext(MessageContextMenu);
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteMessage = async () => {
    if (!message || !id) return;

    await dispatch(
      deleteMessageThunk({
        conversationId: parseInt(id),
        messageId: message.id,
      })
    );
  };

  const handleEditMessage = async () => {
    if (!message || !id) return;
    setIsEditMessage(true);
    setEditMessage(message);
  };

  return (
    <>
      {user?.id === message?.author.id && (
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
