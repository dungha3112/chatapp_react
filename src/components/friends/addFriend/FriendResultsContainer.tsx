import React from "react";
import { UserType } from "../../../utils/types";
import styles from "./index.module.scss";

type Props = {
  userResults: UserType[];
  handleSelectUser: (user: UserType) => void;
};

const FriendResultsContainer = ({ userResults, handleSelectUser }: Props) => {
  return (
    <div className={styles.friendResultsContainer}>
      <div className={styles.friendResultContainerStyle}>
        {userResults.map((user) => (
          <div
            className={styles.resultItemStyle}
            key={user.id}
            onClick={() => handleSelectUser(user)}
          >
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendResultsContainer;
