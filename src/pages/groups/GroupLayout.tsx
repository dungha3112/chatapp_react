import { useContext, useEffect, useState } from "react";
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
  GroupParticipantLeftPayload,
  GroupType,
} from "../../utils/types";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import ConversationPanel from "../../components/conversations/ConversationPanel";

const GroupLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(
    window.innerWidth > 800
  );
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const groupMessage = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );

  useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onGroupCreate", (payload: GroupType) => {

      dispatch(addGroup(payload));
    });

    socket.on("onGroupMessage", (payload: GroupMessageEventPayload) => {

      dispatch(addGroupMessage(payload));
      dispatch(updateGroup(payload.group));
    });

    socket.on("onGroupUserAdd", (payload: GroupType) => {
      dispatch(addGroup(payload));
    });

    socket.on("onGroupReceivedNewUser", (payload: GroupType) => {
      dispatch(updateGroup(payload));
    });

    socket.on("onGroupUserRemoved", (payload: GroupType) => {
      dispatch(removeGroup(payload));

      if (id && parseInt(id) === payload.id) {
        navigate("/groups");
      }
    });

    socket.on("onGroupOwnerUpdate", (payload: GroupType) => {
      dispatch(updateGroup(payload));
    });

    // send socket to all user in group
    socket.on("onGroupRecipientRemoved", (payload: GroupType) => {
      dispatch(updateGroup(payload));
    });

    socket.on(
      "onGroupParticipantLeft",
      (payload: GroupParticipantLeftPayload) => {
        dispatch(updateGroup(payload.group));
      }
    );

    return () => {
      socket.off("onGroupCreate");
      socket.off("onGroupMessage");

      socket.off("onGroupUserAdd");
      socket.off("onGroupReceivedNewUser");

      socket.off("onGroupUserRemoved");
      socket.off("onGroupOwnerUpdate");

      //// send socket to all user in group
      socket.off("onGroupRecipientRemoved");
      socket.off("onGroupParticipantLeft");
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
      {showSidebar && <ConversationSidebar />}
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  );
};

export default GroupLayout;
