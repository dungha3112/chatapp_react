import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedConversationType } from "../utils/types";

export interface SelectedState {
  type: SelectedConversationType;
}

const initialState: SelectedState = {
  type: "private",
};

export const selectedTypeSlice = createSlice({
  name: "selectedType",
  initialState,
  reducers: {
    updateType: (state, action: PayloadAction<SelectedConversationType>) => {
      state.type = action.payload;
    },
  },
});

export const { updateType } = selectedTypeSlice.actions;
export default selectedTypeSlice.reducer;
