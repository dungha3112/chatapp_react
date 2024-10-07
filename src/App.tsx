import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationPage from "./pages/conversations/ConversationPage";
import ConversationChanelPage from "./pages/conversations/ConversationChanelPage";
import { ReactNode, useState } from "react";
import { AuthContext } from "./utils/contexts/AuthContext";
import { UserType } from "./utils/types";
import { useAuth } from "./utils/hooks/useAuth";

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
const AppWithProviders = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

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
