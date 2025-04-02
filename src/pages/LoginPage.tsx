import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/login/index";
import { Page } from "../styles";
import { AuthContext } from "../utils/contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) return navigate("/conversations");
  }, [navigate, user]);

  return (
    <Page $display="flex" $justifyContent="center" $alignItems="center">
      <LoginForm />
    </Page>
  );
};

export default LoginPage;
