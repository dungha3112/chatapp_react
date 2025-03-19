import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendRejectedItem from "./FriendRejectedItem";
import { getFriendRejectedRequestListThunk } from "../../../store/friends/friendsThunk";
import { AppDispatch, RootState } from "../../../store";
import { FriendListContainer } from "../../../styles/friend";

const FriendRejected = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { friendRejectedRequests } = useSelector(
    (state: RootState) => state.friends
  );

  useEffect(() => {
    dispatch(getFriendRejectedRequestListThunk());
  }, [dispatch]);

  return (
    <FriendListContainer>
      {friendRejectedRequests.length === 0 && <div>No Friend Requests :(</div>}
      {friendRejectedRequests.map((friend) => (
        <FriendRejectedItem rejectedRequest={friend} key={friend.id} />
      ))}
    </FriendListContainer>
  );
};

export default FriendRejected;
