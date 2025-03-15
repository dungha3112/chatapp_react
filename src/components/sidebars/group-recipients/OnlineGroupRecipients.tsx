import { GiQueenCrown } from "react-icons/gi";
import { GroupRecipientItemSidebarStyle } from "../../../styles/group-recipients/groupRecipientsSidebar";
import { MessageItemAvatar } from "../../../styles/messages";
import { ContextMenuEventType, UserType } from "../../../utils/types";
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
            <MessageItemAvatar />
            <span>{`${user.firstName} ${user.lastName}`}</span>
            {user.id === ownerId && <GiQueenCrown color="#FFB800" size={14} />}
          </GroupRecipientItemSidebarStyle>
        );
      })}
    </>
  );
};

export default OnlineGroupRecipients;
