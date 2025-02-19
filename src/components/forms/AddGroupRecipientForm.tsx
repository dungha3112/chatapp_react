import React, { Dispatch, useState } from "react";
import styles from "./index.module.scss";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const AddGroupRecipientForm = ({ setShowModal }: Props) => {
  const [username, setUsername] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <InputContainer $backgroundColor="#161616">
        <InputLabel htmlFor="recipient">Recipient</InputLabel>

        <InputField
          id="recipient"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer>

      <Button className={styles.button} type="submit" disabled={!username}>
        Add Recipient
      </Button>
    </form>
  );
};

export default AddGroupRecipientForm;
