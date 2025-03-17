import { useEffect, useState } from "react";
import FriendList from "../../components/friends/FriendList";
import FriendRequests from "../../components/friends/FriendRequests";
import { Button } from "../../styles";
import {
  FriendNavbarItem,
  FriendsNavbarStyle,
  FriendsPageStyle,
} from "../../styles/friend";
import { friendsNavbarItems } from "../../utils/constants";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import CreateFriendRequestModal from "../../components/modals/CreateFriendRequestModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { onChangeFriendNavType } from "../../store/friends/friendsSlice";
import { FriendNavType } from "../../utils/types";
import FriendRejected from "../../components/friends/FriendRejected";
import AddFriend from "../../components/friends/addFriend/AddFriend";

const FriendsLayout = () => {
  const friendNavType = useSelector(
    (state: RootState) => state.friends.friendNavType
  );
  const [showModal, setShowModal] = useState<boolean>(false);
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
      {showModal && <CreateFriendRequestModal setShowModal={setShowModal} />}
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

          <Button $size="sm" $flex={true} onClick={() => setShowModal(true)}>
            <MdOutlinePersonAddAlt1 fontSize={18} />
            <span>Add Friend</span>
          </Button>
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
