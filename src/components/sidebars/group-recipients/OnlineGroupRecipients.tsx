import { GiQueenCrown } from "react-icons/gi";
import avatarDefault from "../../../assets/default_avatar.jpg";
import { GroupRecipientItemSidebarStyle } from "../../../styles/group-recipients/groupRecipientsSidebar";
import { ContextMenuEventType, UserType } from "../../../utils/types";
import Avatar from "../../avatars/Avatar";

type Props = {
  users: UserType[];
  onUserContextMenu: (e: ContextMenuEventType, user: UserType) => void;
  ownerId?: number;
};
const OnlineGroupRecipients = ({
  users,
  onUserContextMenu,
  ownerId,
}: Props) => {
  return (
    <>
      {users.map((user) => {
        return (
          <GroupRecipientItemSidebarStyle
            key={user.id}
            onContextMenu={(e) => onUserContextMenu(e, user)}
          >
            <Avatar
              url={
                user.profile?.avatar?.secure_url
                  ? user.profile?.avatar?.secure_url
                  : avatarDefault
              }
              size="sm"
            />
            <span>{`${user.firstName} ${user.lastName}`}</span>
            {user.id === ownerId && <GiQueenCrown color="#FFB800" size={14} />}
          </GroupRecipientItemSidebarStyle>
        );
      })}
    </>
  );
};

export default OnlineGroupRecipients;
