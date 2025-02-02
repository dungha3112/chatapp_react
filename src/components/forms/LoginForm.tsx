import { Link, useNavigate } from "react-router-dom";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";
import styles from "./index.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserCredentialsParams } from "../../utils/types";
import { postLoginApi } from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../utils/hooks/useAuth";
import { SocketContext } from "../../utils/contexts/SocketContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentialsParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const { user } = useAuth();

  const onSubmit: SubmitHandler<UserCredentialsParams> = async (data) => {
    try {
      setLoading(true);
      await postLoginApi(data);
      socket.connect();
      navigate("/conversations");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) return navigate("/conversations");
  }, [navigate, user]);

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
        {loading ? "Loading ..." : "Login Now"}
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
