import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel,
} from "../../../styles";
import { RegisterFormProps } from "../../../utils/types/form";
import styles from "../index.module.scss";

const NameField = ({ register, errors }: RegisterFormProps) => {
  return (
    <section className={styles.nameFieldRow}>
      <InputContainer>
        <InputContainerHeader>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          {errors.firstName && (
            <InputError>{errors.firstName.message} </InputError>
          )}
        </InputContainerHeader>
        <InputField
          id="firstName"
          type="text"
          {...register("firstName", { required: "First name is required" })}
        />
      </InputContainer>

      <InputContainer>
        <InputContainerHeader>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          {errors.lastName && (
            <InputError>{errors.lastName.message}</InputError>
          )}
        </InputContainerHeader>
        <InputField
          id="lastName"
          type="text"
          {...register("lastName", { required: "Last name is required" })}
        />
      </InputContainer>
    </section>
  );
};

export default NameField;
