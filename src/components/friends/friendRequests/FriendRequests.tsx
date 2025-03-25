import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FriendListContainer } from "../../../styles/friend";
import FriendRequestItem from "./FriendRequestItem";

const FriendRequests = () => {
  const { friendRequests } = useSelector((state: RootState) => state.friends);

  return (
    <FriendListContainer>
      {friendRequests.length === 0 && <div>No Friend Requests :(</div>}
      {friendRequests.map((friend) => (
        <FriendRequestItem friendRequest={friend} key={friend.id} />
      ))}
    </FriendListContainer>
  );
};

export default FriendRequests;
