import { Dispatch, SetStateAction } from "react";
import { SelectedRecipientPillStyle } from "../../styles/conversations";
import { UserType } from "../../utils/types";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

type Props = {
  user: UserType;
  setSelectedUser: Dispatch<SetStateAction<UserType | undefined>>;
};
const SelectedRecipientChip = ({ user, setSelectedUser }: Props) => {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.email}</span>
        {/* <CiCircleCheck fontSize={22} color="#2b09ff" /> */}
        <CiCircleRemove
          className="icon"
          onClick={() => setSelectedUser(undefined)}
        />
      </div>
    </SelectedRecipientPillStyle>
  );
};

export default SelectedRecipientChip;
