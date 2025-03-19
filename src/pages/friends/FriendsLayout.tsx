import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddFriend from "../../components/friends/addFriend/AddFriend";
import FriendList from "../../components/friends/friendList/FriendList";

import FriendRejected from "../../components/friends/friendRejected/FriendRejected";
import FriendRequests from "../../components/friends/friendRequests/FriendRequests";
import { AppDispatch, RootState } from "../../store";
import { onChangeFriendNavType } from "../../store/friends/friendsSlice";
import {
  FriendNavbarItem,
  FriendsNavbarStyle,
  FriendsPageStyle,
} from "../../styles/friend";
import { friendsNavbarItems } from "../../utils/constants";
import { FriendNavType } from "../../utils/types";

const FriendsLayout = () => {
  const friendNavType = useSelector(
    (state: RootState) => state.friends.friendNavType
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("friendNavType")) {
      dispatch(
        onChangeFriendNavType(
          localStorage.getItem("friendNavType") as FriendNavType
        )
      );
    }
  }, [dispatch]);

  return (
    <>
      <FriendsPageStyle>
        <FriendsNavbarStyle>
          <div className="navLinks">
            {friendsNavbarItems.map((item) => (
              <FriendNavbarItem
                $active={item.id === friendNavType}
                key={item.id}
                onClick={() => {
                  dispatch(onChangeFriendNavType(item.id as FriendNavType));
                  localStorage.setItem(
                    "friendNavType",
                    item.id as FriendNavType
                  );
                }}
              >
                {item.label}
              </FriendNavbarItem>
            ))}
          </div>
        </FriendsNavbarStyle>

        {renderNavPage(friendNavType)}
      </FriendsPageStyle>
    </>
  );
};

const renderNavPage = (nav: FriendNavType) => {
  switch (nav) {
    case "requests":
      return <FriendRequests />;

    case "rejected":
      return <FriendRejected />;

    case "addFriend":
      return <AddFriend />;

    default:
      return <FriendList />;
  }
};

export default FriendsLayout;
