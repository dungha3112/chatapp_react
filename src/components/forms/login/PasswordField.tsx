import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel,
} from "../../../styles";
import { LoginFormProps } from "../../../utils/types/form";

const PasswordField = ({ register, errors }: LoginFormProps) => {
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="password">Password</InputLabel>

        {errors.password && <InputError> {errors.password.message}</InputError>}
      </InputContainerHeader>
      <InputField
        id="password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password is at least 6 char" },
        })}
      />
    </InputContainer>
  );
};

export default PasswordField;
