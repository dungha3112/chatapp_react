import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/conversations/conversationThunk";
import { Button, InputContainer, InputLabel, TextField } from "../../styles";
import { searchUsersApi } from "../../utils/api";
import useDebounce from "../../utils/hooks/useDebounce";
import { SelectedConversationType, UserType } from "../../utils/types";
import RecipientField from "../recipients/RecipientField";
import RecipientResultsContainer from "../recipients/RecipientResultsContainer";
import styles from "./index.module.scss";

type Props = {
  type: SelectedConversationType;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationForm = ({ setShowModal, type }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser || !message) return;

    const data = { email: selectedUser.email, message };
    return await dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        setShowModal(false);
        navigate(`/conversation/${data.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
    setQuery("");
    setUserResults([]);
  };

  const handleMultipleUserSelect = (user: UserType) => {
    const exists = selectedUsers.find((u) => u.id === user.id);

    if (!exists) setSelectedUsers((prev) => [...prev, user]);
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <RecipientField
        query={query}
        searching={searching}
        selectedUser={selectedUser}
        setQuery={setQuery}
        setSelectedUser={setSelectedUser}
      />

      {!selectedUser &&
        !searching &&
        userResults.length > 0 &&
        debounceQuery && (
          <RecipientResultsContainer
            handleUserSelect={handleUserSelect}
            userResults={userResults}
            type={type}
            handleMultipleUserSelect={handleMultipleUserSelect}
          />
        )}

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
