import {
  RecipientResultContainerStyle,
  RecipientResultItemStyle,
  RecipientScrollableItemContainer,
} from "../../styles/recipients";
import { UserType } from "../../utils/types";
import { CiCircleCheck } from "react-icons/ci";
import Avatar from "../avatars/Avatar";

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
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Avatar size="sm" user={user} />
              <span>{user.username}</span>
            </div>
            <CiCircleCheck className="icon" />
          </RecipientResultItemStyle>
        ))}
      </RecipientScrollableItemContainer>
    </RecipientResultContainerStyle>
  );
};

export default RecipientResultsContainer;
