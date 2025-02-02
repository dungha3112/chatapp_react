import { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { UserAvatarContainer } from "../../styles";
import {
  UserSidebarFooterStyle,
  UserSidebarHeaderStyle,
  UserSidebarItemStyle,
  UserSidebarStyle,
} from "../../styles/userSidebar";
import CreateConversationModal from "../modals/CreateConversationModal";
import { BsChatDots, BsPerson } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { LuMessageSquarePlus } from "react-icons/lu";

const UserSidebar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserSidebarHeaderStyle>
          <UserAvatarContainer />
        </UserSidebarHeaderStyle>

        {/* button create modal conversation */}
        <UserSidebarItemStyle>
          <LuMessageSquarePlus size={30} onClick={() => setShowModal(true)} />
        </UserSidebarItemStyle>

        <UserSidebarFooterStyle>
          <UserSidebarItemStyle $active={true}>
            <BsChatDots size={30} />
          </UserSidebarItemStyle>

          <UserSidebarItemStyle>
            <BsPerson size={30} />
          </UserSidebarItemStyle>

          <UserSidebarItemStyle>
            <TfiReload size={30} />
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
