import React, { useContext } from "react";
import { FriendRequestType } from "../../utils/types";
import { FriendRequestItemContainer } from "../../styles/friend";
import { AuthContext } from "../../utils/contexts/AuthContext";

type Props = {
  friend: FriendRequestType;
};
const FriendRequestItem = ({ friend }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <FriendRequestItemContainer>
      <div className="avatar"></div>
      <div>
        {user?.id === friend.sender.id ? (
          <div>Outing request to {friend.receiver.email}</div>
        ) : (
          <div>Incoming request to {friend.sender.email}</div>
        )}
      </div>
    </FriendRequestItemContainer>
  );
};

export default FriendRequestItem;
