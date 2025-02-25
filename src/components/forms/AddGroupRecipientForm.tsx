import React, { Dispatch, useState } from "react";
import styles from "./index.module.scss";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";
import { useParams } from "react-router-dom";
import { addGroupRecipientApi } from "../../utils/api";

import { useToast } from "../../utils/hooks/useToast";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const AddGroupRecipientForm = ({ setShowModal }: Props) => {
  const [username, setUsername] = useState<string>("");
  const { id } = useParams();
  const { success, error } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !username) return;

    const params = { email: username, groupId: parseInt(id) };
    addGroupRecipientApi(params)
      .then((res) => {
        setShowModal(false);
        success("Added recipient success!");
      })
      .catch((err) => error(err));
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <InputContainer $backgroundColor="#161616">
        <InputLabel htmlFor="recipient">Recipient</InputLabel>

        <InputField
          id="recipient"
          autoComplete="off"
          value={username}
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
