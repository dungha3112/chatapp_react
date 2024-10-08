import { ReactNode, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationChanelPage from "./pages/conversations/ConversationChanelPage";
import ConversationPage from "./pages/conversations/ConversationPage";
import { AuthContext } from "./utils/contexts/AuthContext";
import { UserType } from "./utils/types";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <ConversationPage />
      </AuthenticatedRoute>
    ),
    children: [
      { path: "/conversation/:id", element: <ConversationChanelPage /> },
    ],
  },
]);

const AppWithProviders = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  return (
    <AppWithProviders>
      <RouterProvider router={router} />
    </AppWithProviders>
  );
};

export default App;
