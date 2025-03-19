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

  return (
    <FriendRequestItemContainer>
      <div className="user">
        <div className="avatar"></div>

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
