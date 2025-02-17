import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputContainer, InputField, InputLabel } from "../../styles";
import { postRegisterApi } from "../../utils/api";
import { CreateUserParams } from "../../utils/types";
import styles from "./index.module.scss";
import { toast } from "react-toastify";

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
        {loading ? "Loading ..." : "Create a new account"}
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
