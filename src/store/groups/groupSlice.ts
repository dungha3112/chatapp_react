import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EditOrDeleteLastMessageGroupSidebarResponse,
  GroupType,
} from "../../utils/types";
import { createGroupThunk, fetchGroupsThunk } from "./groupThunk";
import { RootState } from "..";

export interface GroupState {
  groups: GroupType[];
  loading: boolean;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<GroupType>) => {
      state.groups.unshift(action.payload);
    },

    updateGroup: (state, action: PayloadAction<GroupType>) => {
      const group = action.payload;
      const index = state.groups.findIndex((g) => g.id === group.id);
      state.groups.splice(index, 1);
      state.groups.unshift(group);
    },

    // editOrDeleteLastMessageGroupSidebar
    editOrDeleteLastMessageGroupSidebar: (
      state,
      action: PayloadAction<EditOrDeleteLastMessageGroupSidebarResponse>
    ) => {
      const { isEdit, messages, message, groupId } = action.payload;

      console.log("editOrDeleteLastMessage group : ", action.payload);

      const group = state.groups.find((g) => g.id === groupId);
      const index = state.groups.findIndex((g) => g.id === groupId);
      const isLastMessageSent = group?.lastMessageSent.id === message.id;
      if (!isLastMessageSent) return;

      if (isEdit) {
        console.log("edit message last sent in the group ...");
        state.groups[index].lastMessageSent = message;
      } else {
        if (!messages) return;
        console.log("delete message last sent in the group ");
        state.groups[index].lastMessageSent = messages[1];
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchGroupsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
        state.groups = action.payload.data;
        state.loading = false;
      })

      .addCase(createGroupThunk.fulfilled, (state, action) => {
        state.groups.unshift(action.payload.data);
      });
  },
});

const selectGroups = (state: RootState) => state.group.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const { addGroup, updateGroup, editOrDeleteLastMessageGroupSidebar } =
  groupsSlice.actions;
export default groupsSlice.reducer;
