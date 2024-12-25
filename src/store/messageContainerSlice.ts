import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType } from "../utils/types";

export interface MessageContainerState {
  selectedMessage?: MessageType;
  messageBegingEdited?: MessageType;
  isEditingMessage: boolean;
}

const initialState: MessageContainerState = {
  selectedMessage: undefined,
  messageBegingEdited: undefined,
  isEditingMessage: false,
};

export const messageContainerSlice = createSlice({
  name: "messageContainer",
  initialState,
  reducers: {
    handleSelectedMessage: (state, action: PayloadAction<MessageType>) => {
      state.selectedMessage = action.payload;
    },
    handleSetMessageBegingEdited: (
      state,
      action: PayloadAction<MessageType>
    ) => {
      state.messageBegingEdited = action.payload;
    },
    handleSetIsEditingMessage: (state, action: PayloadAction<boolean>) => {
      state.isEditingMessage = action.payload;
    },
  },
});

export const {
  handleSelectedMessage,
  handleSetMessageBegingEdited,
  handleSetIsEditingMessage,
} = messageContainerSlice.actions;

export default messageContainerSlice.reducer;
