import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createFriendRequestThunk } from "../../../store/friends/friendsThunk";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../../styles";
import { useToast } from "../../../utils/hooks/useToast";
import styles from "./index.module.scss";

const AddFriend = () => {
  const [username, setUsername] = useState<string>("");

  const { success, error } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    dispatch(createFriendRequestThunk(username))
      .unwrap()
      .then(() => {
        success("Send requests success ...");
      })
      .catch((err) => {
        error(err.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <section className={styles.inputs}>
        <InputContainer $backgroundColor="#161616">
          <InputLabel htmlFor="recipient">Username</InputLabel>

          <InputField
            id="recipient"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>
      </section>

      <section className={styles.button}>
        <Button $size="sm" $flex={true} type="submit" disabled={!username}>
          Add Request
        </Button>
      </section>
    </form>
  );
};

export default AddFriend;
