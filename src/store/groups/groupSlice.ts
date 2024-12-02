import { createSelector, createSlice } from "@reduxjs/toolkit";
import { GroupType } from "../../utils/types";
import { fetchGroupsThunk } from "./groupThunk";
import { RootState } from "..";

export interface GroupState {
  groups: GroupType[];
}

const initialState: GroupState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: { addGroup: (state, action) => {} },

  extraReducers(builder) {
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
    });
  },
});

const selectGroups = (state: RootState) => state.group.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const { addGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
