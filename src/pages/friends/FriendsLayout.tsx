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
  const { friendNavType, friendRejectedRequests, friendRequests } = useSelector(
    (state: RootState) => state.friends
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

  const onRenderNumber = (item: FriendNavType) => {
    return (
      <>
        {item === "requests" && friendRequests.length > 0 && (
          <span style={{ color: "green" }}> ({friendRequests.length})</span>
        )}
        {item === "rejected" && friendRejectedRequests.length > 0 && (
          <span style={{ color: "red" }}>
            ({friendRejectedRequests.length})
          </span>
        )}
      </>
    );
  };

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
                {onRenderNumber(item.id as FriendNavType)}
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
