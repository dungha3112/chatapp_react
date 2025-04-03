import { useContext } from "react";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { useDispatch } from "react-redux";
import { FriendRequestType } from "../../../utils/types";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import { AppDispatch } from "../../../store";
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
} from "../../../store/friends/friendsThunk";
import { FriendRequestItemContainer } from "../../../styles/friend";
import { getUserFriendInstance } from "../../../utils/helpers";

import avatarDefatult from "../../../assets/default_avatar.jpg";
import Avatar from "../../avatars/Avatar";

type Props = {
  rejectedRequest: FriendRequestType;
};
const FriendRejectedItem = ({ rejectedRequest }: Props) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const isIncomingRequest = () => user?.id === rejectedRequest.receiver.id;

  const handleAcceptRequest = () => {
    dispatch(acceptFriendRequestThunk(rejectedRequest.id));
  };

  const handleDeleteRequest = () => {
    dispatch(cancelFriendRequestThunk(rejectedRequest.id));
  };

  const recipient = getUserFriendInstance(user, rejectedRequest);

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
              ? `${rejectedRequest.sender.firstName} ${rejectedRequest.sender.lastName}`
              : `${rejectedRequest.receiver.firstName} ${rejectedRequest.receiver.lastName}`}
          </span>

          {isIncomingRequest() ? (
            <span className="status">
              {`You have declined the friend request from ${rejectedRequest.sender.firstName} ${rejectedRequest.sender.lastName}`}
            </span>
          ) : (
            <span className="status">
              {`${rejectedRequest.receiver.firstName} ${rejectedRequest.receiver.lastName} rejected your friend request`}
            </span>
          )}
        </div>
      </div>

      <div className="icons">
        {isIncomingRequest() ? (
          <IoIosCheckmarkCircleOutline
            onClick={handleAcceptRequest}
            cursor="pointer"
            fontSize={30}
            color="#32fa00"
          />
        ) : (
          <IoIosCloseCircleOutline
            onClick={handleDeleteRequest}
            cursor="pointer"
            fontSize={30}
            color="#FF0000"
          />
        )}
      </div>
    </FriendRequestItemContainer>
  );
};

export default FriendRejectedItem;
