import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ConversationRecipientField from "../../recipients/ConversationRecipientField";
import { UserType } from "../../../utils/types";
import { Button } from "../../../styles";
import { useToast } from "../../../utils/hooks/useToast";
import useDebounce from "../../../utils/hooks/useDebounce";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { searchUsersApi } from "../../../utils/api";
import { createFriendRequestThunk } from "../../../store/friends/friendsThunk";
import {
  RecipientNoResultContainerStyle,
  RecipientNoResultItemStyle,
} from "../../../styles/recipients";
import { FaFrownOpen } from "react-icons/fa";
import FriendResultsContainer from "./FriendResultsContainer";

const AddFriend = () => {
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
      })
      .catch((err) => {
        error(err.message);
      });
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles.details}>
        <section className={styles.input}>
          <ConversationRecipientField
            query={query}
            searching={searching}
            selectedUser={selectedUser}
            setQuery={setQuery}
            setSelectedUser={setSelectedUser}
          />

          {/* userResults > 0 */}

          <div className={styles.recipientResult}>
            {!selectedUser && !searching && userResults.length > 0 && query && (
              <FriendResultsContainer
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
          </div>
        </section>

        <section className={styles.button}>
          <Button>Send request</Button>
        </section>
      </div>
    </form>
  );
};

export default AddFriend;
