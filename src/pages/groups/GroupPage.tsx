import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { addGroupMessage } from "../../store/groupMessage/groupMessageSlice";
import { fetchGroupMessagesThunk } from "../../store/groupMessage/groupMessageThunk";
import { addGroup, updateGroup } from "../../store/groups/groupSlice";
import { fetchGroupsThunk } from "../../store/groups/groupThunk";
import { updateType } from "../../store/selectedSlice";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { GroupMessageEventPayload, GroupType } from "../../utils/types";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import ConversationPanel from "../../components/conversations/ConversationPanel";

const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onGroupCreateToClient", (payload: GroupType) => {
      dispatch(addGroup(payload));
    });

    socket.on("onGroupMessageToClient", (payload: GroupMessageEventPayload) => {
      dispatch(addGroupMessage(payload));
      dispatch(updateGroup(payload.group));
    });

    return () => {
      socket.off("onGroupCreateToClient");
      socket.off("onGroupMessageToClient");
    };
  }, [socket, dispatch]);

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
