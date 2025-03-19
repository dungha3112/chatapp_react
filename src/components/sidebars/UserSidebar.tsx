import { useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAvatarContainer } from "../../styles";
import {
  UserSidebarFooterStyle,
  UserSidebarHeaderStyle,
  UserSidebarItemStyle,
  UserSidebarStyle,
} from "../../styles/userSidebar";
import { userSidebarItems } from "../../utils/constants";
import { UserSidebarRouteType } from "../../utils/types";

const CustomIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case "conversations":
      return <BsChatDots size={30} />;

    case "friends":
      return <FaUserFriends size={30} />;
    default:
      return <RiLogoutCircleLine size={30} />;
  }
};

const UserSidebar = () => {
  const [active, setActive] = useState<UserSidebarRouteType>("conversations");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      setActive(
        location.pathname.split("/").slice(1)[0] as UserSidebarRouteType
      );
      if (location.pathname.split("/").slice(1)[0] === "groups") {
        setActive("conversations");
      }
    }
  }, [location.pathname]);

  return (
    <>
      <UserSidebarStyle>
        <UserSidebarHeaderStyle>
          <UserAvatarContainer />
        </UserSidebarHeaderStyle>

        <UserSidebarFooterStyle>
          {userSidebarItems.map((item) => (
            <UserSidebarItemStyle
              key={item.id}
              $active={item.id === active}
              onClick={() => {
                setActive(item.id);
                navigate(item.pathname);
              }}
            >
              {CustomIcon(item.id)}
            </UserSidebarItemStyle>
          ))}
        </UserSidebarFooterStyle>
      </UserSidebarStyle>
    </>
  );
};

export default UserSidebar;
