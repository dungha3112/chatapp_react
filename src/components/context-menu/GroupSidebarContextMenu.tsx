import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ContextMenuItemStyle, ContextMenuSyle } from "../../styles";
import { PointsType } from "../../utils/types";

import { CiLogout } from "react-icons/ci";
import { IoArchiveOutline } from "react-icons/io5";
import { userLeaveGroupThunk } from "../../store/groups/groupThunk";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";

type Props = {
  points: PointsType;
};
const GroupSidebarContextMenu = ({ points }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { selectGroup } = useSelector((state: RootState) => state.group);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const handleUserLeaveGroup = async () => {
    if (!selectGroup) return;
    const groupId = selectGroup.id;
    dispatch(userLeaveGroupThunk({ groupId })).then(() => {
      if (selectGroup.owner.id === user?.id) return;
      if (parseInt(id!) === groupId) {
        navigate("/groups");
      }
    });
  };
  return (
    <ContextMenuSyle $top={points.y} $left={points.x}>
      <ContextMenuItemStyle
        style={{ color: "#FF0000" }}
        onClick={handleUserLeaveGroup}
      >
        <CiLogout fontSize={20} />
        Leave group
      </ContextMenuItemStyle>

      <ContextMenuItemStyle style={{ color: "#5b6161" }}>
        <IoArchiveOutline fontSize={20} />
        Archive
      </ContextMenuItemStyle>
    </ContextMenuSyle>
  );
};

export default GroupSidebarContextMenu;
