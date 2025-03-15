import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaFrownOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createFriendRequestThunk } from "../../store/friends/friendsThunk";
import { Button } from "../../styles";
import {
  RecipientNoResultContainerStyle,
  RecipientNoResultItemStyle,
} from "../../styles/recipients";
import { searchUsersApi } from "../../utils/api";
import useDebounce from "../../utils/hooks/useDebounce";
import { useToast } from "../../utils/hooks/useToast";
import { UserType } from "../../utils/types";
import ConversationRecipientField from "../recipients/ConversationRecipientField";
import RecipientResultsContainer from "../recipients/RecipientResultsContainer";
import styles from "./index.module.scss";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const SendFriendRequestForm = ({ setShowModal }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [searching, setSearching] = useState<boolean>(false);

  const { success, error } = useToast();

  const debounceQuery = useDebounce(query, 1000);

  const dispatch = useDispatch<AppDispatch>();

  const [userResults, setUserResults] = useState<UserType[]>([]);

  useEffect(() => {
    if (debounceQuery) {
      setSearching(true);

      searchUsersApi(debounceQuery)
        .then((res) =>
          res && res.data ? setUserResults(res.data) : setUserResults([])
        )
        .catch((err) => console.log(err))
        .finally(() => setTimeout(() => setSearching(false), 1000));
    }
  }, [debounceQuery]);

  const handleSelectUser = (user: UserType) => {
    setSelectedUser(user);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return;
    dispatch(createFriendRequestThunk(selectedUser.email))
      .unwrap()
      .then(() => {
        success("Send requests success ...");
        setShowModal(false);
      })
      .catch((err) => {
        error(err.message);
      });
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
          <span>No Result ...</span>
          <FaFrownOpen className="icon" />
        </RecipientNoResultItemStyle>
      </RecipientNoResultContainerStyle>
      <section>
        <Button type="submit" className={styles.button}>
          Send Request ...
        </Button>
      </section>
    </form>
  );
};

export default SendFriendRequestForm;
