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
import { useForm } from "react-hook-form";
import {
  CreateConversationParams,
  SelectedConversationType,
} from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { createConversationThunk } from "../../store/conversations/conversationThunk";
import { RecipentResultContainer } from "../../styles/conversations";

type Props = {
  type: SelectedConversationType;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationForm = ({ setShowModal, type }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateConversationParams) => {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "private") {
      console.log(e.target.value);
    } else {
      console.log(e.target.value);
    }
  };

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer $backgroundColor="#161616">
          <InputLabel htmlFor="username">Recipient</InputLabel>
          <InputField
            id="username"
            // {...register("email", { required: "Email is required." })}
            onChange={onChange}
          />
        </InputContainer>
      </section>

      <RecipentResultContainer>
        <div style={{ position: "absolute" }}>ass</div>
      </RecipentResultContainer>

      <section>
        <InputContainer
          $backgroundColor="#5f5b5b"
          className={styles.messageOptions}
        >
          <InputLabel htmlFor="message">Message (optional)</InputLabel>
          <TextField
            id="message"
            rows={3}
            {...register("message", { required: "Message is required." })}
          />
        </InputContainer>
      </section>

      <Button type="submit">Create new conversation</Button>
    </form>
  );
};

export default CreateConversationForm;
