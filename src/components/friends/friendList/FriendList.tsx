import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getFriendListThunk } from "../../../store/friends/friendsThunk";
import { FriendListContainer } from "../../../styles/friend";
import FriendListItem from "./FriendListItem";

const FriendList = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFriendListThunk());
  }, [dispatch]);

  const { friends, loadingFriend } = useSelector(
    (state: RootState) => state.friends
  );

  if (loadingFriend) return <div>Loading ...</div>;

  return (
    <FriendListContainer>
      {friends.map((friend) => (
        <FriendListItem friend={friend} key={friend.id} />
      ))}
    </FriendListContainer>
  );
};

export default FriendList;
