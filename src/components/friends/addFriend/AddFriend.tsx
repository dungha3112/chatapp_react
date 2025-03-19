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
  const [email, setEmail] = useState<string>("");

  const { success, error } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    dispatch(createFriendRequestThunk(email))
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
          <InputLabel htmlFor="recipient">Email</InputLabel>

          <InputField
            id="recipient"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
      </section>

      <section className={styles.button}>
        <Button $size="sm" $flex={true} type="submit" disabled={!email}>
          Add Request
        </Button>
      </section>
    </form>
  );
};

export default AddFriend;
