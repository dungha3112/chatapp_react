import { useContext } from "react";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import { FriendRequestType } from "../../../utils/types";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  rejectFriendRequestThunk,
} from "../../../store/friends/friendsThunk";
import { FriendRequestItemContainer } from "../../../styles/friend";
import avatarDefatult from "../../../assets/default_avatar.jpg";
import Avatar from "../../avatars/Avatar";
import { getUserFriendInstance } from "../../../utils/helpers";

type Props = {
  friendRequest: FriendRequestType;
};
const FriendRequestItem = ({ friendRequest }: Props) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const isIncomingRequest = () => user?.id === friendRequest.receiver.id;

  const handleAcceptRequest = () => {
    dispatch(acceptFriendRequestThunk(friendRequest.id));
  };

  const handleRejectRequest = () => {
    dispatch(rejectFriendRequestThunk(friendRequest.id));
  };

  const handleCancelRequest = () => {
    dispatch(cancelFriendRequestThunk(friendRequest.id));
  };

  const recipient = getUserFriendInstance(user, friendRequest);

  const avatarString = recipient?.profile?.avatar?.secure_url
    ? String(recipient?.profile?.avatar?.secure_url)
    : String(avatarDefatult);

  return (
    <FriendRequestItemContainer>
      <div className="user">
        <Avatar size="md" url={avatarString} />

        <div className="name">
          <span>
            {isIncomingRequest()
              ? `${friendRequest.sender.firstName} ${friendRequest.sender.lastName}`
              : `${friendRequest.receiver.firstName} ${friendRequest.receiver.lastName}`}
          </span>

          {isIncomingRequest() ? (
            <span className="status">
              {`You have a new friend request from ${friendRequest.sender.firstName} ${friendRequest.sender.lastName}`}
            </span>
          ) : (
            <span className="status">
              {`You send a friend request to ${friendRequest.receiver.firstName} ${friendRequest.receiver.lastName}`}
            </span>
          )}
        </div>
      </div>

      <div className="icons">
        {isIncomingRequest() && (
          <IoIosCheckmarkCircleOutline
            onClick={handleAcceptRequest}
            cursor="pointer"
            fontSize={30}
            color="#32fa00"
          />
        )}
        {isIncomingRequest() ? (
          <IoIosCloseCircleOutline
            onClick={handleRejectRequest}
            cursor="pointer"
            fontSize={30}
            color="#FF0000"
          />
        ) : (
          <IoMdRemoveCircleOutline
            onClick={handleCancelRequest}
            cursor="pointer"
            fontSize={30}
            color="#FF0000"
          />
        )}
      </div>
    </FriendRequestItemContainer>
  );
};

export default FriendRequestItem;
