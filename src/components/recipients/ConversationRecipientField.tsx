import { Dispatch, SetStateAction } from "react";
import {
  InputContainer,
  InputField,
  InputLabel,
  InputLabelAnimation,
} from "../../styles";
import { UserType } from "../../utils/types";
import SelectedConversationRecipientChip from "./SelectedConversationRecipientChip";

type Props = {
  searching: boolean;
  selectedUser: UserType | undefined;
  setSelectedUser: Dispatch<SetStateAction<UserType | undefined>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
};

const ConversationRecipientField = ({
  searching,
  selectedUser,
  setSelectedUser,
  setQuery,
  query,
}: Props) => {
  return (
    <section>
      <InputContainer $backgroundColor="#161616">
        {searching ? (
          <InputLabelAnimation $animation={true} $length={"Search ...".length}>
            {"Search ...".split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </InputLabelAnimation>
        ) : (
          <InputLabel htmlFor="username">Recipient</InputLabel>
        )}

        {!selectedUser ? (
          <InputField
            id="username"
            value={query}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : (
          <SelectedConversationRecipientChip
            user={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </InputContainer>
    </section>
  );
};

export default ConversationRecipientField;
