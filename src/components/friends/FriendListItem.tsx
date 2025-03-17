import React, { useContext } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { FriendListItemContainer } from "../../styles/friend";
import { FriendType } from "../../utils/types";
import { AiFillDelete } from "react-icons/ai";
import { ButtonIconStyle } from "../../styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { deleteFriendThunk } from "../../store/friends/friendsThunk";

type Props = {
  friend: FriendType;
};
const FriendListItem = ({ friend }: Props) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteFriend = () => {
    dispatch(deleteFriendThunk(friend.id));
  };

  return (
    <FriendListItemContainer>
      <div className="userDetails">
        <div className="avatar"></div>

        <div className="nameAndMessage">
          <div className="name">
            {user?.id === friend.sender.id
              ? friend.receiver.email
              : friend.sender.email}
          </div>

          <div className="message">Hi How are you ?</div>
        </div>
      </div>

      <ButtonIconStyle>
        <AiFillDelete
          className="icon"
          onClick={handleDeleteFriend}
          cursor="pointer"
        />
      </ButtonIconStyle>
    </FriendListItemContainer>
  );
};

export default FriendListItem;
