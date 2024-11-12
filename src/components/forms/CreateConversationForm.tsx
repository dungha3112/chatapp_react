import React, { Dispatch } from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../styles";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addConversation } from "../../store/conversationSlice";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationForm = ({ setShowModal }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <InputContainer $backgroundColor="#161616">
        <InputLabel htmlFor="username">Recipient</InputLabel>
        <InputField id="username" />
      </InputContainer>

      <InputContainer
        $backgroundColor="#161616"
        className={styles.messageOptions}
      >
        <InputLabel htmlFor="message">Message (optional)</InputLabel>
        <TextField id="message" rows={3} />
      </InputContainer>

      <Button type="submit">Create new conversation</Button>
    </form>
  );
};

export default CreateConversationForm;
