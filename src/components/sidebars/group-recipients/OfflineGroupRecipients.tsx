import React from "react";
import { UserType } from "../../../utils/types";
import { GroupRecipientItemSidebarStyle } from "../../../styles/group-recipients/groupRecipientsSidebar";
import { MessageItemAvatar } from "../../../styles/messages";

type Props = {
  users: UserType[];
};
const OfflineGroupRecipients = ({ users }: Props) => {
  return (
    <>
      {users.map((user) => (
        <GroupRecipientItemSidebarStyle key={user.id}>
          <MessageItemAvatar />
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </GroupRecipientItemSidebarStyle>
      ))}
    </>
  );
};

export default OfflineGroupRecipients;
