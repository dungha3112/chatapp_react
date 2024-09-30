import { Link } from "react-router-dom";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";
import styles from "./index.module.scss";

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField id="email" type="email" />
      </InputContainer>

      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField id="password" type="password" />
      </InputContainer>

      <Button className={styles.button}>Login Now</Button>
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
