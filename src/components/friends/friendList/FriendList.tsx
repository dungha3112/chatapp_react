import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setFriendOnline } from "../../../store/friends/friendsSlice";
import { FriendListContainer } from "../../../styles/friend";
import { SocketContext } from "../../../utils/contexts/SocketContext";
import { FriendType } from "../../../utils/types";
import FriendListItem from "./FriendListItem";
import { getFriendListThunk } from "../../../store/friends/friendsThunk";
import Loading from "../../loadings";

const FriendList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  const { friends, loadingFriend, friendOnlines } = useSelector(
    (state: RootState) => state.friends
  );

  const friendOfflines = friends.filter(
    (friend) => !friendOnlines.find((online) => online.id === friend.id)
  );

  useEffect(() => {
    dispatch(getFriendListThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.emit("getOnlineFriends");
    const interval = setInterval(() => {
      socket.emit("getOnlineFriends");
    }, 10000);

    return () => {
      clearInterval(interval);
      socket.off("getOnlineFriends");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("getOnlineFriends", (payload: FriendType[]) => {
      dispatch(setFriendOnline(payload));
    });

    return () => {
      socket.off("getOnlineFriends");
    };
  }, [dispatch, socket]);

  if (loadingFriend) return <Loading text="Loading friend list ..." />;

  return (
    <FriendListContainer>
      <span style={{ display: "flex", padding: "10px", color: "green" }}>
        Online ({friendOnlines.length})
      </span>
      {friendOnlines.map((friend) => (
        <FriendListItem friend={friend} key={friend.id} online={true} />
      ))}
      <span style={{ display: "flex", padding: "10px", color: "grey" }}>
        Offline ({friendOfflines.length})
      </span>
      {friendOfflines.map((friend) => (
        <FriendListItem friend={friend} key={friend.id} />
      ))}
    </FriendListContainer>
  );
};

export default FriendList;
