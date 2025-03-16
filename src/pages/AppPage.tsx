import { Outlet, useLocation, useParams } from "react-router-dom";
import ConversationSidebar from "../components/sidebars/ConversationSidebar";
import UserSidebar from "../components/sidebars/UserSidebar";
import { LayoutPage } from "../styles";
import { useContext, useEffect } from "react";
import { FriendRequestAcceptResponse, FriendRequestType } from "../utils/types";
import { SocketContext } from "../utils/contexts/SocketContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  addAcceptFriend,
  addFriendRequest,
  removeFriendRequest,
} from "../store/friends/friendsSlice";

const AppPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on("onFriendRequestReceived", (payload: FriendRequestType) => {
      dispatch(addFriendRequest(payload));
    });

    socket.on("onFriendRequestCanceled", (payload: FriendRequestType) => {
      dispatch(removeFriendRequest(payload));
    });

    socket.on(
      "onFriendRequestAccepted",
      (payload: FriendRequestAcceptResponse) => {
        dispatch(addAcceptFriend(payload));
      }
    );

    socket.on("onFriendRequestRejected", (payload: FriendRequestType) => {
      dispatch(removeFriendRequest(payload));
    });

    return () => {
      socket.off("onFriendRequestReceived");
      socket.off("onFriendRequestCanceled");
      socket.off("onFriendRequestAccepted");
      socket.off("onFriendRequestRejected");
    };
  }, [socket, dispatch]);

  return (
    <LayoutPage>
      <UserSidebar />
      {location.pathname !== "/conversations" &&
        location.pathname !== "/conversations/" &&
        location.pathname !== "/groups" &&
        location.pathname !== "/groups/" &&
        location.pathname === "friends" &&
        !id &&
        // location.pathname === "/friends/" &&
        !id && <ConversationSidebar />}

      <Outlet />
    </LayoutPage>
  );
};

export default AppPage;
