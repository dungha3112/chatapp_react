import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/conversations/conversationThunk";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../styles";
import {
  RecipientResultContainer,
  RecipientResultItem,
} from "../../styles/conversations";
import { searchUsersApi } from "../../utils/api";
import useDebounce from "../../utils/hooks/useDebounce";
import { SelectedConversationType, UserType } from "../../utils/types";
import styles from "./index.module.scss";
import SelectedRecipientChip from "../recipients/SelectedRecipientChip";

type Props = {
  type: SelectedConversationType;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationForm = ({ setShowModal, type }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [selectedUser, setSelectedUser] = useState<UserType>();

  const debounceMessage = useDebounce(message, 1000);
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

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
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

      {!selectedUser &&
        !searching &&
        userResults.length > 0 &&
        debounceQuery && (
          <RecipientResultContainer>
            {userResults.map((user) => (
              <RecipientResultItem
                key={user.id}
                onClick={() => handleUserSelect(user)}
              >
                <span>{user.email}</span>
              </RecipientResultItem>
            ))}
          </RecipientResultContainer>
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
