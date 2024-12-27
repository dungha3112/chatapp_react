import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupMessageType, MessageType } from "../utils/types";

export interface MessageContainerState {
  selectedMessage?: MessageType | GroupMessageType;
  messageBegingEdited?: MessageType | GroupMessageType;
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

    handleUpdateMessageContentBegingEdited: (
      state,
      action: PayloadAction<string>
    ) => {
      if (state.messageBegingEdited)
        state.messageBegingEdited.content = action.payload;
    },

    handleResetMessageContainter: (state) => {
      state.isEditingMessage = false;
      state.messageBegingEdited = undefined;
      state.selectedMessage = undefined;
    },
  },
});

export const {
  handleSelectedMessage,
  handleSetMessageBegingEdited,
  handleSetIsEditingMessage,

  handleUpdateMessageContentBegingEdited,
  handleResetMessageContainter,
} = messageContainerSlice.actions;

export default messageContainerSlice.reducer;
