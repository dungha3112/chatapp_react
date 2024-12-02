import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../../components/conversations/ConversationSidebar";
import { AppDispatch } from "../../store";
import { fetchGroupsThunk } from "../../store/groups/groupThunk";
import { updateType } from "../../store/selectedSlice";
import { Page } from "../../styles";
import GroupChanelPage from "./GroupChanelPage";

const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  return (
    <Page $display="flex" $justifyContent="space-between" $alignItems="center">
      <ConversationSidebar />
      {!id && <GroupChanelPage />}
      <Outlet />
    </Page>
  );
};

export default GroupPage;
