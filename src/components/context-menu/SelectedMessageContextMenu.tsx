import { ContextMenuSyle } from "../../styles";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {
  points: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ points }: Props) => {
  return (
    <ContextMenuSyle $left={points.x} $top={points.y}>
      <ul>
        <li>
          <MdDelete color="red" fontSize={20} /> Delete
        </li>
        <li>
          <MdEdit color="blue" fontSize={20} /> Edit
        </li>
      </ul>
    </ContextMenuSyle>
  );
};

export default SelectedMessageContextMenu;
