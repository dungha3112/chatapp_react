import { ReactNode, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConversationChanelPage from "./pages/conversations/ConversationChanelPage";
import ConversationPage from "./pages/conversations/ConversationPage";
import { AuthContext } from "./utils/contexts/AuthContext";
import { socket, SocketContext } from "./utils/contexts/SocketContext";
import { UserType } from "./utils/types";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import GroupChanelPage from "./pages/groups/GroupChanelPage";
import AppPage from "./pages/AppPage";
import GroupPage from "./pages/groups/GroupPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // {
  //   path: "/",
  //   element: (
  //     <AuthenticatedRoute>
  //       <AppPage />
  //     </AuthenticatedRoute>
  //   ),
  //   children: [
  //     {
  //       path: "/conversation",
  //       element: <ConversationPage />,
  //       children: [
  //         {
  //           path: "/conversation/:id",
  //           element: <ConversationChanelPage />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "/group",
  //       element: <GroupPage />,
  //       children: [{ path: "/group/:id", element: <GroupChanelPage /> }],
  //     },
  //   ],
  // },
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <ConversationPage />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "/conversation/:id",
        element: <ConversationChanelPage />,
      },
      {
        path: "/group",
        element: <GroupPage />,
        children: [{ path: "/group/:id", element: <GroupChanelPage /> }],
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
      <RouterProvider router={router} />
    </AppWithProviders>
  );
};

export default App;
