import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { CreateUserParams, UserCredentialsParams } from "../types";

export type LoginFormProps = {
  register: UseFormRegister<UserCredentialsParams>;
  errors: FieldErrorsImpl<{
    username: string;
    password: string;
  }>;
};

export type RegisterFormProps = {
  register: UseFormRegister<CreateUserParams>;
  errors: FieldErrorsImpl<{
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }>;
};
