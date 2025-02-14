import { Dispatch, SetStateAction } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { UserType } from "../../utils/types";
import { SelectedRecipientPillStyle } from "../../styles/recipients";

type Props = {
  user: UserType;
  setSelectedUser: Dispatch<SetStateAction<UserType | undefined>>;
};
const SelectedConversationRecipientChip = ({
  user,
  setSelectedUser,
}: Props) => {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.email}</span>
        <CiCircleRemove
          className="icon"
          onClick={() => setSelectedUser(undefined)}
        />
      </div>
    </SelectedRecipientPillStyle>
  );
};

export default SelectedConversationRecipientChip;
