import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import { AppDispatch } from "../../store";
import { fetchGroupsThunk } from "../../store/groups/groupThunk";
import { updateType } from "../../store/selectedSlice";
import { Page } from "../../styles";
import GroupChanelPage from "./GroupChanelPage";
import { SocketContext } from "../../utils/contexts/SocketContext";
import { GroupMessageEventPayload, GroupType } from "../../utils/types";
import { addGroup, updateGroup } from "../../store/groups/groupSlice";
import { addGroupMessage } from "../../store/groupMessage/groupMessageSlice";
import { fetchGroupMessagesThunk } from "../../store/groupMessage/groupMessageThunk";

const GroupPage = () => {
  const { id: groupId } = useParams();
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
    if (groupId) dispatch(fetchGroupMessagesThunk(parseInt(groupId)));
  }, [dispatch, groupId]);

  return (
    <Page $display="flex" $justifyContent="space-between" $alignItems="center">
      {/* <ConversationSidebar /> */}
      {!groupId && <GroupChanelPage />}
      <Outlet />
    </Page>
  );
};

export default GroupPage;
