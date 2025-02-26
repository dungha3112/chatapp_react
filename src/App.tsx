import { ReactNode, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import AppPage from "./pages/AppPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationChanelPage from "./pages/conversations/ConversationChanelPage";
import ConversationPage from "./pages/conversations/ConversationPage";
import GroupChanelPage from "./pages/groups/GroupChanelPage";
import GroupPage from "./pages/groups/GroupPage";
import { store } from "./store";
import { AuthContext } from "./utils/contexts/AuthContext";
import { socket, SocketContext } from "./utils/contexts/SocketContext";
import { UserType } from "./utils/types";

import { ToastContainer } from "react-toastify";
import ConversationPageGuard from "./guards/ConversationPageGuard";
import GroupPageGuard from "./guards/GroupPageGuard";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <AppPage />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "/groups",
        element: <GroupPage />,
        children: [
          {
            path: ":id",
            element: <GroupPageGuard children={<GroupChanelPage />} />,
          },
        ],
      },

      {
        path: "/conversations",
        element: <ConversationPage />,
        children: [
          {
            path: ":id",
            element: (
              <ConversationPageGuard children={<ConversationChanelPage />} />
            ),
          },
        ],
      },
    ],
  },
]);

const AppWithProviders = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();

  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
};

const App = () => {
  return (
    <AppWithProviders>
      <ToastContainer theme="dark" />
      <RouterProvider router={router} />
    </AppWithProviders>
  );
};

export default App;
