import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel,
} from "../../../styles";
import { checkUsernameApi } from "../../../utils/api";
import { RegisterFormProps } from "../../../utils/types/form";

const UsernameField = ({ register, errors }: RegisterFormProps) => {
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="username">Username</InputLabel>

        {errors.username && <InputError>{errors.username.message}</InputError>}
      </InputContainerHeader>
      <InputField
        id="username"
        type="username"
        {...register("username", {
          required: "Username is required",
          minLength: { value: 5, message: "Username is at least 5 char" },
          maxLength: { value: 32, message: "Maximum username is 32 char" },
          validate: {
            checkUsername: async (username: string) => {
              try {
                await checkUsernameApi(username);
              } catch (error) {
                return String(error);
              }
            },
          },
        })}
      />
    </InputContainer>
  );
};

export default UsernameField;
