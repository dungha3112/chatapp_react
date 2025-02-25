import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EditOrDeleteLastMessageGroupSidebarResponse,
  GroupType,
} from "../../utils/types";
import {
  createGroupThunk,
  fetchGroupsThunk,
  removeGroupUserThunk,
} from "./groupThunk";
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
      console.log(`add group slice`, action.payload);

      state.groups.unshift(action.payload);
    },

    updateGroup: (state, action: PayloadAction<GroupType>) => {
      console.log(`update group:`, action.payload);

      const group = action.payload;
      const existingGroup = state.groups.find((g) => g.id === group.id);
      console.log(existingGroup);

      if (!existingGroup) return;

      const index = state.groups.findIndex((g) => g.id === group.id);

      state.groups.splice(index, 1);
      state.groups.unshift(group);
    },

    removeGroup: (state, action: PayloadAction<GroupType>) => {
      const group = state.groups.find((g) => g.id === action.payload.id);
      const index = state.groups.findIndex((g) => g.id === action.payload.id);
      if (!group) return;
      state.groups.splice(index, 1);
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
        if (!action.payload) return;

        state.groups = action.payload.data;
        state.loading = false;
      })

      .addCase(createGroupThunk.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.groups.unshift(action.payload.data);
      })

      .addCase(removeGroupUserThunk.fulfilled, (state, action) => {
        if (!action.payload) return;
        const group = action.payload.data;

        const exitingGroup = state.groups.find((g) => g.id === group.id);
        const index = state.groups.findIndex((i) => i.id === group.id);

        if (exitingGroup) {
          state.groups[index] = group;
        }
      });
  },
});

const selectGroups = (state: RootState) => state.group.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const {
  addGroup,
  updateGroup,
  editOrDeleteLastMessageGroupSidebar,
  removeGroup,
} = groupsSlice.actions;
export default groupsSlice.reducer;
