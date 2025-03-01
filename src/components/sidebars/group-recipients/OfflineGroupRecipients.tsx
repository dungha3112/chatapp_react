import React from "react";
import { GroupRecipientItemSidebarStyle } from "../../../styles/group-recipients/groupRecipientsSidebar";
import { MessageItemAvatar } from "../../../styles/messages";
import { ContextMenuEventType, UserType } from "../../../utils/types";

type Props = {
  users: UserType[];
  onUserContextMenu: (e: ContextMenuEventType, user: UserType) => void;
};
const OfflineGroupRecipients = ({ users, onUserContextMenu }: Props) => {
  return (
    <>
      {users.map((user) => (
        <GroupRecipientItemSidebarStyle
          key={user.id}
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <MessageItemAvatar />
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </GroupRecipientItemSidebarStyle>
      ))}
    </>
  );
};

export default OfflineGroupRecipients;
