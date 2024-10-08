import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { Page } from "../styles";
import { useAuth } from "../utils/hooks/useAuth";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) return navigate("/");
  }, [navigate, user]);

  return (
    <Page display="flex" justifyContent="center" alignItems="center">
      <LoginForm />
    </Page>
  );
};

export default LoginPage;
