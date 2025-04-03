import { useContext, useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import {
  IconBadge,
  UserSidebarFooterStyle,
  UserSidebarHeaderStyle,
  UserSidebarItemStyle,
  UserSidebarStyle,
} from "../../styles/userSidebar";
import { userSidebarItems } from "../../utils/constants";
import { UserSidebarRouteType } from "../../utils/types";
import { IoSettingsOutline } from "react-icons/io5";
import { logoutUserApi } from "../../utils/api";
import { AuthContext } from "../../utils/contexts/AuthContext";
import Avatar from "../avatars/Avatar";
const CustomIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case "conversations":
      return <BsChatDots size={30} />;

    case "friends":
      return <FaUserFriends size={30} />;

    case "settings":
      return <IoSettingsOutline size={30} />;
    default:
      break;
  }
};

const UserSidebar = () => {
  const [active, setActive] = useState<UserSidebarRouteType>("conversations");

  const { updateAuthUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { friendRequests } = useSelector((state: RootState) => state.friends);

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

  const handleLogoutUser = () => {
    logoutUserApi()
      .then(() => {
        updateAuthUser(undefined);
      })
      .finally(() => navigate("/login", { replace: true }));
  };

  return (
    <>
      <UserSidebarStyle>
        <UserSidebarHeaderStyle>
          <Avatar size="md" url={String(user?.profile?.avatar?.secure_url)} />
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
              {item.id === "friends" && friendRequests.length > 0 && (
                <IconBadge>
                  {friendRequests.length > 100 ? (
                    <span>99+</span>
                  ) : (
                    friendRequests.length
                  )}
                </IconBadge>
              )}
            </UserSidebarItemStyle>
          ))}
        </UserSidebarFooterStyle>

        <UserSidebarItemStyle onClick={handleLogoutUser}>
          <RiLogoutCircleLine size={30} />
        </UserSidebarItemStyle>
      </UserSidebarStyle>
    </>
  );
};

export default UserSidebar;
