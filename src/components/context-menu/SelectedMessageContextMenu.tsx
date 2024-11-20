import { useContext } from "react";
import { ContextMenuSyle } from "../../styles";
import { MdDelete, MdEdit } from "react-icons/md";
import { MessageContextMenu } from "../../utils/contexts/MessageContextMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useParams } from "react-router-dom";
import { deleteMessageThunk } from "../../store/messages/messageThunk";
import { AuthContext } from "../../utils/contexts/AuthContext";

type Props = {
  points: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ points }: Props) => {
  const { message } = useContext(MessageContextMenu);
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

  return (
    <ContextMenuSyle $left={points.x} $top={points.y}>
      <ul>
        {user?.id === message?.author.id && (
          <>
            <li onClick={handleDeleteMessage}>
              <MdDelete color="red" fontSize={20} /> Delete
            </li>

            <li>
              <MdEdit color="blue" fontSize={20} /> Edit
            </li>
          </>
        )}
      </ul>
    </ContextMenuSyle>
  );
};

export default SelectedMessageContextMenu;
