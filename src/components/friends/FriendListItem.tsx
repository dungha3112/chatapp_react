import React, { useContext } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { FriendListItemContainer } from "../../styles/friend";
import { FriendType } from "../../utils/types";

type Props = {
  friend: FriendType;
};
const FriendListItem = ({ friend }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <FriendListItemContainer>
      <div className="avatar"></div>
      <div>
        {user?.id === friend.sender.id
          ? friend.receiver.email
          : friend.sender.email}
      </div>
    </FriendListItemContainer>
  );
};

export default FriendListItem;
