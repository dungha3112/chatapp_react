import { useEffect, useState } from "react";
import FriendBlocked from "../../components/friends/FriendBlocked";
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

const FriendsLayout = () => {
  const [navbar, setNavbar] = useState<string>("friendList");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (String(localStorage.getItem("navbarFriend"))) {
      setNavbar(String(localStorage.getItem("navbarFriend")));
    }
  }, []);

  useEffect(() => {
    if (navbar) localStorage.setItem("navbarFriend", navbar);
  }, [navbar]);

  return (
    <>
      {showModal && <CreateFriendRequestModal setShowModal={setShowModal} />}
      <FriendsPageStyle>
        <FriendsNavbarStyle>
          <div className="navLinks">
            {friendsNavbarItems.map((item) => (
              <FriendNavbarItem
                $active={item.id === navbar}
                key={item.id}
                onClick={() => setNavbar(item.id)}
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

        {renderNavPage(navbar)}
      </FriendsPageStyle>
    </>
  );
};

const renderNavPage = (nav: string) => {
  switch (nav) {
    case "requests":
      return <FriendRequests />;

    case "blocked":
      return <FriendBlocked />;

    default:
      return <FriendList />;
  }
};

export default FriendsLayout;
