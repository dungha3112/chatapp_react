import { RiLogoutCircleLine } from "react-icons/ri";
import { UserAvatarContainer } from "../../styles";
import {
  UserSidebarFooterStyle,
  UserSidebarHeaderStyle,
  UserSidebarItemStyle,
  UserSidebarStyle,
} from "../../styles/userSidebar";
import { BsChatDots, BsPerson } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";

const UserSidebar = () => {
  return (
    <>
      <UserSidebarStyle>
        <UserSidebarHeaderStyle>
          <UserAvatarContainer />
        </UserSidebarHeaderStyle>

        <UserSidebarFooterStyle>
          <UserSidebarItemStyle $active={true}>
            <BsChatDots size={30} />
          </UserSidebarItemStyle>

          <UserSidebarItemStyle>
            <BsPerson size={30} />
          </UserSidebarItemStyle>

          <UserSidebarItemStyle>
            <RiLogoutCircleLine size={30} />
          </UserSidebarItemStyle>
        </UserSidebarFooterStyle>
      </UserSidebarStyle>
    </>
  );
};

export default UserSidebar;
