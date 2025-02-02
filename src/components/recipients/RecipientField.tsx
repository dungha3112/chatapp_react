import { Dispatch, SetStateAction } from "react";
import { InputContainer, InputField, InputLabel } from "../../styles";
import { UserType } from "../../utils/types";
import SelectedRecipientChip from "./SelectedRecipientChip";

type Props = {
  searching: boolean;
  selectedUser: UserType | undefined;
  setSelectedUser: Dispatch<SetStateAction<UserType | undefined>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
};

const RecipientField = ({
  searching,
  selectedUser,
  setSelectedUser,
  setQuery,
  query,
}: Props) => {
  return (
    <section>
      <InputContainer $backgroundColor="#161616">
        <InputLabel htmlFor="username">
          {searching ? "Search ..." : "Recipient"}
        </InputLabel>

        {!selectedUser ? (
          <InputField
            id="username"
            value={query}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : (
          <SelectedRecipientChip
            user={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </InputContainer>
    </section>
  );
};

export default RecipientField;
