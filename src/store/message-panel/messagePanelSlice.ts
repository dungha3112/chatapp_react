import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessagePanelState {
  attachments: File[];
}

const initialState: MessagePanelState = {
  attachments: [],
};

export const messagePanelSlice = createSlice({
  name: "messagePanel",
  initialState,
  reducers: {
    addAttachment: (state, action: PayloadAction<File>) => {
      state.attachments.push(action.payload);
    },
    removeAttachment: (state, action) => {
      const index = action.payload;
      state.attachments = state.attachments.filter((_, i) => i !== index);
    },

    removeAllAttachments: (state) => {
      state.attachments = [];
    },
  },
});

export const { addAttachment, removeAttachment, removeAllAttachments } =
  messagePanelSlice.actions;

export default messagePanelSlice.reducer;
