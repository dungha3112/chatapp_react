import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ConversationSidebar from "../components/sidebars/ConversationSidebar";
import UserSidebar from "../components/sidebars/UserSidebar";
import { AppDispatch } from "../store";
import {
  addAcceptFriend,
  addFriendRequest,
  deleteFriend,
  onChangeFriendNavType,
  removeFriendRequest,
} from "../store/friends/friendsSlice";
import { LayoutPage } from "../styles";
import { SocketContext } from "../utils/contexts/SocketContext";
import { useToast } from "../utils/hooks/useToast";
import {
  FriendRequestAcceptResponse,
  FriendRequestType,
  FriendType,
} from "../utils/types";
import { getFriendRequestListThunk } from "../store/friends/friendsThunk";
import { AuthContext } from "../utils/contexts/AuthContext";
import { getUserFriendInstance } from "../utils/helpers";

const AppPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { info } = useToast({ theme: "dark", position: "bottom-left" });

  useEffect(() => {
    dispatch(getFriendRequestListThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onFriendRequestReceived", (payload: FriendRequestType) => {
      dispatch(addFriendRequest(payload));
      const { sender } = payload;
      info(
        `You have a new friend request from ${sender.firstName} ${sender.lastName}`,
        {
          onClick: () => {
            navigate("/friends");
            dispatch(onChangeFriendNavType("requests"));
          },
        }
      );
    });

    socket.on("onFriendRequestCanceled", (payload: FriendRequestType) => {
      dispatch(removeFriendRequest(payload));
      const { sender } = payload;
      info(
        `${sender.firstName} ${sender.lastName} cancels friend request with you`,
        {
          onClick: () => {
            navigate("/friends");
            dispatch(onChangeFriendNavType("requests"));
          },
        }
      );
    });

    socket.on(
      "onFriendRequestAccepted",
      (payload: FriendRequestAcceptResponse) => {
        dispatch(addAcceptFriend(payload));
        const { receiver } = payload.friendRequest;
        info(
          `${receiver.firstName} ${receiver.lastName} accepted your friend request`,
          {
            onClick: () => {
              navigate("/friends");
              dispatch(onChangeFriendNavType("friendList"));
            },
          }
        );
      }
    );

    socket.on("onFriendRequestRejected", (payload: FriendRequestType) => {
      dispatch(removeFriendRequest(payload));

      const { receiver } = payload;
      info(
        `${receiver.firstName} ${receiver.lastName} rejected your friend request`,
        {
          onClick: () => {
            navigate("/friends");
            dispatch(onChangeFriendNavType("rejected"));
          },
        }
      );
    });

    socket.on("onFriendDelete", (payload: FriendType) => {
      dispatch(deleteFriend(payload));

      const receiver = getUserFriendInstance(user, payload);

      info(`${receiver?.firstName} ${receiver?.lastName} unfriend you`, {
        onClick: () => {
          navigate("/friends");
          dispatch(onChangeFriendNavType("friendList"));
        },
      });
    });

    return () => {
      socket.off("onFriendRequestReceived");
      socket.off("onFriendRequestCanceled");
      socket.off("onFriendRequestAccepted");
      socket.off("onFriendRequestRejected");

      socket.off("onFriendDelete");
    };
  }, [socket, dispatch, info, navigate]);

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
