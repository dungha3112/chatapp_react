import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import { Page } from "../styles";
import { useAuth } from "../utils/hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) return navigate("/");
  }, [navigate, user]);

  return (
    <Page $display="flex" $justifyContent="center" $alignItems="center">
      <RegisterForm />
    </Page>
  );
};

export default RegisterPage;
