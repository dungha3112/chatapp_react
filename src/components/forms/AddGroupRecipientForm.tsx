import React, { Dispatch, useState } from "react";
import styles from "./index.module.scss";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";
import ConversationRecipientField from "../recipients/ConversationRecipientField";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const AddGroupRecipientForm = ({ setShowModal }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [searching, setSearching] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      {/* <InputContainer $backgroundColor="#161616">
        <InputLabel htmlFor="recipient">Recipient</InputLabel>

        <InputField
          id="recipient"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer> */}
      <Button className={styles.button} type="submit" disabled={!username}>
        Add Recipient
      </Button>
    </form>
  );
};

export default AddGroupRecipientForm;
