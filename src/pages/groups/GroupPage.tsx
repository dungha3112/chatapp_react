import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  addGroupMessage,
  deleteGroupMessage,
  editGroupMessage,
  selectGroupMessage,
} from "../../store/groupMessage/groupMessageSlice";
import { fetchGroupMessagesThunk } from "../../store/groupMessage/groupMessageThunk";
import {
  addGroup,
  editOrDeleteLastMessageGroupSidebar,
  removeGroup,
  updateGroup,
} from "../../store/groups/groupSlice";
import { fetchGroupsThunk } from "../../store/groups/groupThunk";
import { updateType } from "../../store/selectedSlice";
import { SocketContext } from "../../utils/contexts/SocketContext";
import {
  GroupMessageEventPayload,
  GroupMessageType,
  GroupType,
} from "../../utils/types";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import ConversationPanel from "../../components/conversations/ConversationPanel";

const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const groupMessage = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onGroupCreate", (payload: GroupType) => {
      console.log(`create group`, payload);

      dispatch(addGroup(payload));
    });

    socket.on("onGroupMessage", (payload: GroupMessageEventPayload) => {
      console.log(`on group create message`, payload);

      dispatch(addGroupMessage(payload));
      dispatch(updateGroup(payload.group));
    });

    socket.on("onGroupUserAdd", (payload: GroupType) => {
      dispatch(addGroup(payload));
    });

    socket.on("onGroupReceivedNewUser", (payload: GroupType) => {
      console.log(" add new user to group ...", payload);
      // dispatch(updateGroup(payload));
    });

    // send socket to all user in group
    // socket.on("onGroupRecipientRemoved", (payload: GroupType) => {
    //   console.log(`group recipients removed`, payload);
    //   dispatch(updateGroup(payload));
    // });

    socket.on("onGroupUserRemoved", (payload: GroupType) => {
      dispatch(removeGroup(payload));

      if (id && parseInt(id) === payload.id) {
        console.log("Navigating User to /groups");
        navigate("/groups");
      }
    });

    socket.on("onGroupOwnerUpdate", (payload: GroupType) => {
      console.log("on Group Owner Update", payload);
      dispatch(updateGroup(payload));
    });

    return () => {
      socket.off("onGroupCreate");
      socket.off("onGroupMessage");

      socket.off("onGroupUserAdd");
      socket.off("onGroupReceivedNewUser");

      //// send socket to all user in group
      // socket.off("onGroupRecipientRemoved");
      socket.off("onGroupUserRemoved");

      socket.off("onGroupOwnerUpdate");
    };
  }, [dispatch, id, navigate, socket]);

  useEffect(() => {
    socket.on("onGroupMessageDelete", (payload: GroupMessageType) => {
      dispatch(deleteGroupMessage(payload));

      dispatch(
        editOrDeleteLastMessageGroupSidebar({
          isEdit: false,
          messages: groupMessage?.messages.slice(0, 2),
          groupId: Number(payload.group?.id),
          message: payload,
        })
      );
    });

    socket.on("onGroupMessageEdit", (payload: GroupMessageType) => {
      dispatch(editGroupMessage(payload));

      dispatch(
        editOrDeleteLastMessageGroupSidebar({
          isEdit: true,
          messages: [],
          groupId: Number(payload.group?.id),
          message: payload,
        })
      );
    });

    return () => {
      socket.off("onGroupMessageDelete");
      socket.off("onGroupMessageEdit");
    };
  }, [dispatch, groupMessage?.messages, socket]);

  useEffect(() => {
    if (id) dispatch(fetchGroupMessagesThunk(parseInt(id)));
  }, [dispatch, id]);

  return (
    <>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  );
};

export default GroupPage;
