import { Outlet } from "react-router-dom";

const AppPage = () => {
  return (
    <div>
      Hi
      <Outlet />
    </div>
  );
};

export default AppPage;
