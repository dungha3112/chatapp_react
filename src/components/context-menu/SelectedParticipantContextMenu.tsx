import { useContext } from "react";
import { BsPersonFillSlash } from "react-icons/bs";
import { FaPeopleArrows, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { handleUserProfileModal } from "../../store/friends/friendsSlice";
import { selectGroupById } from "../../store/groups/groupSlice";
import {
  removeGroupUserThunk,
  updateGroupOwnerThunk,
} from "../../store/groups/groupThunk";
import { ContextMenuItemStyle, ContextMenuSyle } from "../../styles";
import { getUserProfileApi } from "../../utils/api";
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
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );
  const { user } = useContext(AuthContext);

  const isOwner = isGroupOwner(user, group);

  const handleKickUser = () => {
    if (!selectedUser || !id) return;

    const params: RemoveGroupUserParams = {
      id: parseInt(id),
      removeUserId: selectedUser.id,
    };
    dispatch(removeGroupUserThunk(params))
      .unwrap()
      .catch((err) => console.log(err));
  };

  const handleTransferGroupOwner = () => {
    if (!selectedUser || !id) return;

    const params = { id: parseInt(id), newOwnerId: selectedUser.id };
    dispatch(updateGroupOwnerThunk(params));
  };

  const handleWatchProfile = () => {
    if (!selectedUser) return;
    getUserProfileApi(selectedUser?.id)
      .then((res) => {
        if (!res?.data) return;
        dispatch(
          handleUserProfileModal({
            openModalUserProfile: true,
            userProfile: res.data,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <ContextMenuSyle $top={points.y} $left={points.x}>
      <ContextMenuItemStyle onClick={handleWatchProfile}>
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
