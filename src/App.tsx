import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  { path: "/", element: <div>hello</div> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  { path: "/:id", element: <div>Page chanel conversation</div> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
