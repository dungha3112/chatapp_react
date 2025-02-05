import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupType } from "../../utils/types";
import { fetchGroupsThunk } from "./groupThunk";
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
  },

  extraReducers(builder) {
    builder.addCase(fetchGroupsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
      state.loading = false;
    });
  },
});

const selectGroups = (state: RootState) => state.group.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const { addGroup, updateGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
