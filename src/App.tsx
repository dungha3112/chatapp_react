import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationPage from "./pages/conversations/ConversationPage";
import ConversationChanelPage from "./pages/conversations/ConversationChanelPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  {
    path: "/",
    element: <ConversationPage />,
    children: [
      { path: "/conversation/:id", element: <ConversationChanelPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
