import {
  RecipientResultContainerStyle,
  RecipientResultItemStyle,
  RecipientScrollableItemContainer,
} from "../../styles/recipients";
import { UserType } from "../../utils/types";
import { CiCircleCheck } from "react-icons/ci";

type Props = {
  userResults: UserType[];
  handleSelectUser: (user: UserType) => void;
};

const RecipientResultsContainer = ({
  userResults,
  handleSelectUser,
}: Props) => {
  return (
    <RecipientResultContainerStyle>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItemStyle
            key={user.id}
            onClick={() => handleSelectUser(user)}
          >
            <span>{user.email}</span>
            <CiCircleCheck className="icon" />
          </RecipientResultItemStyle>
        ))}
      </RecipientScrollableItemContainer>
    </RecipientResultContainerStyle>
  );
};

export default RecipientResultsContainer;
