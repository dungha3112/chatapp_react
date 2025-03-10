import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  openFeedIconEditMess: boolean;
  openFeedIconNewMess: boolean;
}

export const initialState: ModalState = {
  openFeedIconEditMess: false,
  openFeedIconNewMess: false,
};
export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    handleOpenFeedIconEditMess: (state, action: PayloadAction<boolean>) => {
      state.openFeedIconEditMess = action.payload;
    },

    handleOpenFeedIconNewMess: (state, action: PayloadAction<boolean>) => {
      state.openFeedIconNewMess = action.payload;
    },
  },
});

export const { handleOpenFeedIconEditMess, handleOpenFeedIconNewMess } =
  modalSlice.actions;
export default modalSlice.reducer;
