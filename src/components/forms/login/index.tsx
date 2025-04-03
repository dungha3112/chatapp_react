import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../styles";
import { postLoginApi } from "../../../utils/api";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import { SocketContext } from "../../../utils/contexts/SocketContext";
import { UserCredentialsParams } from "../../../utils/types";
import styles from "../index.module.scss";
import PasswordField from "./PasswordField";
import UsernameField from "./UsernameField";
import Loading from "../../loadings";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentialsParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const { user } = useContext(AuthContext);

  const onSubmit: SubmitHandler<UserCredentialsParams> = async (data) => {
    try {
      setLoading(true);
      await postLoginApi(data);
      socket.connect();
      navigate("/conversations");
      toast.clearWaitingQueue();
      toast("Account logged in!", { type: "success" });
    } catch (error) {
      toast.clearWaitingQueue();
      toast(String(error), { type: "error" });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    if (user) return navigate("/conversations");
  }, [navigate, user]);

  const formFieldProps = { errors, register };

  return (
    <>
      {loading && <Loading text="Loading, awaiting ..." />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <UsernameField {...formFieldProps} />

        <section className={styles.loginFormPassword}>
          <PasswordField {...formFieldProps} />
        </section>

        <Button className={styles.button} type="submit" disabled={loading}>
          Login
        </Button>
        <div className={styles.footer}>
          <span>You don't have the account?</span>
          <Link to="/register">
            <span>Register.</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
