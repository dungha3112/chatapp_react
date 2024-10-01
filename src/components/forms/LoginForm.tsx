import { Link } from "react-router-dom";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";
import styles from "./index.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "../../utils/types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
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

      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
      </InputContainer>

      <Button className={styles.button} type="submit">
        Login Now
      </Button>
      <div className={styles.footer}>
        <span>You don't have the account?</span>
        <Link to="/register">
          <span>Register.</span>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
