import { SubmitHandler, useForm } from "react-hook-form";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { RegisterType } from "../../utils/types";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
      </InputContainer>

      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField
            id="firstName"
            type="text"
            {...register("firstName", { required: "First name is required" })}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField
            id="lastName"
            type="text"
            {...register("lastName", { required: "Last name is required" })}
          />
        </InputContainer>
      </section>

      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
      </InputContainer>

      <Button type="submit" className={styles.button}>
        Create a new account
      </Button>

      <div className={styles.footer}>
        <span>Already have an account ?</span>
        <Link to="/login">
          <span>Login now.</span>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
