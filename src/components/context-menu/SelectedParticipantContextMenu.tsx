import { useContext } from "react";
import { BsPersonFillSlash } from "react-icons/bs";
import { FaPeopleArrows, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { selectGroupById } from "../../store/groups/groupSlice";
import {
  removeGroupUserThunk,
  updateGroupOwnerThunk,
} from "../../store/groups/groupThunk";
import { ContextMenuItemStyle, ContextMenuSyle } from "../../styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { isGroupOwner } from "../../utils/helpers";
import { PointsType, RemoveGroupUserParams } from "../../utils/types";
type Props = {
  points: PointsType;
};
const SelectedParticipantContextMenu = ({ points }: Props) => {
  const { selectedUser } = useSelector(
    (state: RootState) => state.groupSidebar
  );
  const { id: groupId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!))
  );
  const { user } = useContext(AuthContext);

  const isOwner = isGroupOwner(user, group);

  const handleKickUser = async () => {
    if (!selectedUser || !groupId) return;

    const params: RemoveGroupUserParams = {
      groupId: parseInt(groupId),
      removeUserId: selectedUser.id,
    };
    dispatch(removeGroupUserThunk(params))
      .unwrap()
      .catch((err) => console.log(err));
  };

  const handleTransferGroupOwner = async () => {
    if (!selectedUser || !groupId) return;

    const params = { groupId: parseInt(groupId), newOwnerId: selectedUser.id };
    dispatch(updateGroupOwnerThunk(params));
  };

  return (
    <ContextMenuSyle $top={points.y} $left={points.x}>
      <ContextMenuItemStyle>
        <FaUserCircle fontSize={20} />
        Profile
      </ContextMenuItemStyle>

      {user?.id !== selectedUser?.id && isOwner && (
        <>
          <ContextMenuItemStyle
            style={{ color: "#FF0000" }}
            onClick={handleKickUser}
          >
            <BsPersonFillSlash fontSize={20} />
            Kick user
          </ContextMenuItemStyle>

          <ContextMenuItemStyle
            style={{ color: "#FFB800" }}
            onClick={handleTransferGroupOwner}
          >
            <FaPeopleArrows fontSize={20} />
            Transfer owner
          </ContextMenuItemStyle>
        </>
      )}
    </ContextMenuSyle>
  );
};

export default SelectedParticipantContextMenu;
