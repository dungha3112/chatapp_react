import { UserType } from "../../utils/types";
import { CiCircleRemove } from "react-icons/ci";
import { SelectedRecipientPillStyle } from "../../styles/recipients";

type Props = {
  user: UserType;
  removeUser: (user: UserType) => void;
  // setUserResults: React.Dispatch<React.SetStateAction<UserType[]>>;
};

const SelectedGroupRecipientChip = ({
  user,
  removeUser,
}: // setUserResults,
Props) => {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.email}</span>
        <CiCircleRemove
          className="icon"
          onClick={() => {
            removeUser(user);
            // setUserResults((prev) => [...prev, user]);
          }}
        />
      </div>
    </SelectedRecipientPillStyle>
  );
};

export default SelectedGroupRecipientChip;
