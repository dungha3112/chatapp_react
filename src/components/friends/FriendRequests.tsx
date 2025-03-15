import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getFriendRequestListThunk } from "../../store/friends/friendsThunk";
import { FriendListContainer } from "../../styles/friend";
import FriendRequestItem from "./FriendRequestItem";

const FriendRequests = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { friendRequests } = useSelector((state: RootState) => state.friends);

  useEffect(() => {
    dispatch(getFriendRequestListThunk());
  }, [dispatch]);

  return (
    <FriendListContainer>
      {friendRequests.length === 0 && <div>No Friend Requests :(</div>}
      {friendRequests.map((friend) => (
        <FriendRequestItem friend={friend} key={friend.id} />
      ))}
    </FriendListContainer>
  );
};

export default FriendRequests;
