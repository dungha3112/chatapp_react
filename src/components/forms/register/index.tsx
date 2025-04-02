import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "../index.module.scss";

import { toast } from "react-toastify";
import { Button } from "../../../styles";
import { postRegisterApi } from "../../../utils/api";
import { CreateUserParams } from "../../../utils/types";
import NameField from "./NameField";
import PasswordField from "./PasswordField";
import UsernameField from "./UsernameField";
import Loading from "../../loadings";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserParams>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateUserParams> = async (data) => {
    try {
      setLoading(true);
      await postRegisterApi(data);
      navigate("/login");
      toast.clearWaitingQueue();
      toast("Account created!", { type: "success" });
    } catch (error) {
      toast.clearWaitingQueue();
      toast(String(error), { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const formFieldProps = { errors, register };
  return (
    <>
      {loading && <Loading text="Create new account, Please awaiting ..." />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <UsernameField {...formFieldProps} />

        <NameField {...formFieldProps} />

        <PasswordField {...formFieldProps} />

        <Button type="submit" className={styles.button} disabled={loading}>
          Create a new account
        </Button>

        <div className={styles.footer}>
          <span>Already have an account ?</span>
          <Link to="/login">
            <span>Login now.</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
