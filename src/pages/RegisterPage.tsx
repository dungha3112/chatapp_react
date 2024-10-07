import RegisterForm from "../components/forms/RegisterForm";
import { Page } from "../styles";

const RegisterPage = () => {
  return (
    <Page display="flex" justifyContent="center" alignItems="center">
      <RegisterForm />
    </Page>
  );
};

export default RegisterPage;