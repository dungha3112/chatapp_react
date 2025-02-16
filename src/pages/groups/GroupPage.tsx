import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
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

  const groupMessage = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onGroupCreateToClientSide", (payload: GroupType) => {
      dispatch(addGroup(payload));
    });

    socket.on(
      "onGroupMessageToClientSide",
      (payload: GroupMessageEventPayload) => {
        dispatch(addGroupMessage(payload));
        dispatch(updateGroup(payload.group));
      }
    );

    socket.on(
      "onGroupMessageDeleteToClientSide",
      (payload: GroupMessageType) => {
        dispatch(deleteGroupMessage(payload));

        dispatch(
          editOrDeleteLastMessageGroupSidebar({
            isEdit: false,
            messages: groupMessage?.messages.slice(0, 2),
            groupId: Number(payload.group?.id),
            message: payload,
          })
        );
      }
    );

    socket.on("onGroupMessageEditToClientSide", (payload: GroupMessageType) => {
      dispatch(editGroupMessage(payload));

      dispatch(
        editOrDeleteLastMessageGroupSidebar({
          isEdit: true,
          messages: [],
          groupId: Number(payload.group.id),
          message: payload,
        })
      );
    });

    return () => {
      socket.off("onGroupCreateToClientSide");
      socket.off("onGroupMessageToClientSide");
      socket.off("onGroupMessageDeleteToClientSide");
      socket.off("onGroupMessageEditToClientSide");
    };
  }, [socket, dispatch, groupMessage?.messages]);

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
