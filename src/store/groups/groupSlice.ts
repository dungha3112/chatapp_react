import { createSlice } from "@reduxjs/toolkit";
import { GroupType } from "../../utils/types";
import { fetchGroupsThunk } from "./groupThunk";

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

export const { addGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
