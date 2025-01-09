import { RiLogoutCircleLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { UserAvatarContainer } from "../../styles";
import {
  UserSidebarFooterStyle,
  UserSidebarHeaderStyle,
  UserSidebarStyle,
} from "../../styles/sidebar";
import { useState } from "react";
import CreateConversationModal from "../modals/CreateConversationModal";

const UserSidebar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserSidebarHeaderStyle>
          <UserAvatarContainer />
        </UserSidebarHeaderStyle>

        <>
          <FiEdit size={30} onClick={() => setShowModal(true)} />
        </>

        <UserSidebarFooterStyle>
          <RiLogoutCircleLine size={30} />
        </UserSidebarFooterStyle>
      </UserSidebarStyle>
    </>
  );
};

export default UserSidebar;
