import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./index.module.scss";
import GroupRecipientField from "../recipients/GroupRecipientField";
import { UserType } from "../../utils/types";
import { Button, InputContainer, InputLabel, TextField } from "../../styles";
import useDebounce from "../../utils/hooks/useDebounce";
import { searchUsersApi } from "../../utils/api";
import RecipientResultsContainer from "../recipients/RecipientResultsContainer";
import {
  RecipientChipContainerStyle,
  RecipientNoResultContainerStyle,
  RecipientNoResultItemStyle,
} from "../../styles/recipients";
import { FaFrownOpen } from "react-icons/fa";
import SelectedGroupRecipientChip from "../recipients/SelectedGroupRecipientChip";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const CreateGroupForm = ({ setShowModal }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [selectedRecipients, setSelectedRecipients] = useState<UserType[]>([]);

  const [userResults, setUserResults] = useState<UserType[]>([]);

  const [searching, setSearching] = useState<boolean>(false);

  const debounceQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (debounceQuery) {
      setSearching(true);
      searchUsersApi(debounceQuery)
        .then(({ data }) => {
          setUserResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setTimeout(() => setSearching(false), 500));
    }

    if (!debounceQuery) setUserResults([]);
  }, [debounceQuery]);

  const handleSelectUser = (user: UserType) => {
    const exists = selectedRecipients.find((u) => u.id === user.id);

    if (!exists) setSelectedRecipients((prev) => [...prev, user]);

    // setUserResults((prev) => prev.filter((u) => u.id !== user.id));
  };

  const removeUser = (user: UserType) => {
    setSelectedRecipients((prev) => prev.filter((u) => u.id !== user.id));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <RecipientChipContainerStyle>
        {selectedRecipients.map((user) => (
          <SelectedGroupRecipientChip
            user={user}
            key={user.id}
            removeUser={removeUser}
            // setUserResults={setUserResults}
          />
        ))}
      </RecipientChipContainerStyle>

      <GroupRecipientField
        query={query}
        searching={searching}
        setQuery={setQuery}
      />

      {/* userResults > 0 */}
      {!searching && userResults.length > 0 && query && (
        <RecipientResultsContainer
          userResults={userResults}
          handleSelectUser={handleSelectUser}
        />
      )}

      {/* userResults === [] */}
      <RecipientNoResultContainerStyle
        style={{
          display:
            !searching && userResults.length === 0 && debounceQuery
              ? // && selectedRecipients.length === 0
                "block"
              : "none",
        }}
      >
        <RecipientNoResultItemStyle>
          <span>No Result In Friends List</span>
          <FaFrownOpen className="icon" />
        </RecipientNoResultItemStyle>
      </RecipientNoResultContainerStyle>

      <section>
        <InputContainer
          $backgroundColor="#5f5b5b"
          className={styles.messageOptions}
        >
          <InputLabel htmlFor="message">Message (optional)</InputLabel>
          <TextField
            id="message"
            rows={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
      </section>

      <Button type="submit">Create a new group</Button>
    </form>
  );
};

export default CreateGroupForm;
