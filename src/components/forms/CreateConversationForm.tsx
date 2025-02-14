import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/conversations/conversationThunk";
import { Button, InputContainer, InputLabel, TextField } from "../../styles";
import { searchUsersApi } from "../../utils/api";
import useDebounce from "../../utils/hooks/useDebounce";
import { UserType } from "../../utils/types";
import ConversationRecipientField from "../recipients/ConversationRecipientField";
import RecipientResultsContainer from "../recipients/RecipientResultsContainer";
import styles from "./index.module.scss";
import {
  RecipientNoResultContainerStyle,
  RecipientNoResultItemStyle,
} from "../../styles/recipients";
import { FaFrownOpen } from "react-icons/fa";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationForm = ({ setShowModal }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType>();

  const debounceQuery = useDebounce(query, 1000);

  const [searching, setSearching] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [userResults, setUserResults] = useState<UserType[]>([]);

  useEffect(() => {
    if (debounceQuery) {
      setSearching(true);

      searchUsersApi(debounceQuery)
        .then(({ data }) => {
          setUserResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setTimeout(() => setSearching(false), 1000));
    }
  }, [debounceQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser || !message) return;

    const data = { email: selectedUser.email, message };
    return dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        setShowModal(false);
        navigate(`/conversations/${data.id}`);
      })
      .catch((error) => {
        console.log(`error create new conversation : ${error}`);
      });
  };

  const handleSelectUser = (user: UserType) => {
    setSelectedUser(user);
    // setQuery("");
    // setUserResults([]);
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <ConversationRecipientField
        query={query}
        searching={searching}
        selectedUser={selectedUser}
        setQuery={setQuery}
        setSelectedUser={setSelectedUser}
      />

      {/* userResults > 0 */}

      {!selectedUser && !searching && userResults.length > 0 && query && (
        <RecipientResultsContainer
          handleSelectUser={handleSelectUser}
          userResults={userResults}
        />
      )}

      {/* userResults === [] */}
      <RecipientNoResultContainerStyle
        style={{
          display:
            !searching &&
            !selectedUser &&
            userResults.length === 0 &&
            debounceQuery
              ? "block"
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainer>
      </section>
      <Button type="submit">Create new conversation</Button>
    </form>
  );
};

export default CreateConversationForm;
