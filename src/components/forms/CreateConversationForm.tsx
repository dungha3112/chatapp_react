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
import { createConversationThunk } from "../../store/conversationSlice";
import { useForm } from "react-hook-form";
import { CreateConversationParams } from "../../utils/types";
import { useNavigate } from "react-router-dom";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationForm = ({ setShowModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateConversationParams) => {
    return dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        setShowModal(false);
        navigate(`/conversation/${data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });

    // try {
    //   const res = await dispatch(createConversationThunk(data)).unwrap();
    //   navigate(`/conversation/${res.data.id}`);
    //   setShowModal(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputContainer $backgroundColor="#161616">
        <InputLabel htmlFor="username">Recipient</InputLabel>
        <InputField
          id="username"
          {...register("email", { required: "Email is required." })}
        />
      </InputContainer>

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

      <Button type="submit">Create new conversation</Button>
    </form>
  );
};

export default CreateConversationForm;
