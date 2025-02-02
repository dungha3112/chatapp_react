import {
  RecipientResultContainerStyle,
  RecipientResultItemStyle,
} from "../../styles/recipients";
import { SelectedConversationType, UserType } from "../../utils/types";
import { CiCircleCheck } from "react-icons/ci";

type Props = {
  userResults: UserType[];
  handleUserSelect: (user: UserType) => void;
  type: SelectedConversationType;
  handleMultipleUserSelect: (user: UserType) => void;
};
const RecipientResultsContainer = ({
  userResults,
  handleUserSelect,
  handleMultipleUserSelect,
  type,
}: Props) => {
  return (
    <RecipientResultContainerStyle>
      {userResults.map((user) => (
        <RecipientResultItemStyle
          key={user.id}
          onClick={() =>
            type === "private"
              ? handleUserSelect(user)
              : handleMultipleUserSelect(user)
          }
        >
          <span>{user.email}</span>
          <CiCircleCheck className="icon" />
        </RecipientResultItemStyle>
      ))}
    </RecipientResultContainerStyle>
  );
};

export default RecipientResultsContainer;
