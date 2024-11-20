import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConversationMessage,
  DeleteMessageResponse,
  MessageEventPayload,
} from "../../utils/types";
import { deleteMessageThunk, fetchMessagesThunk } from "./messageThunk";

export interface MessagesState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, message } = action.payload;
      const conversationMessages = state.messages.find(
        (cm) => cm.id === conversation.id
      );
      if (!conversationMessages) return;
      conversationMessages.messages.unshift(message);
    },
    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      const { conversationId, messageId } = action.payload;
      const conversationMessages = state.messages.find(
        (cm) => cm.id === conversationId
      );
      if (!conversationMessages) return;

      const messageIndex = conversationMessages.messages.findIndex(
        (m) => m.id === messageId
      );
      conversationMessages.messages.splice(messageIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        const exists = state.messages.find((cm) => cm.id === id);
        if (exists) {
          console.log("exists");
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        const { conversationId, messageId } = action.payload.data;
        const conversationMessages = state.messages.find(
          (cm) => (cm.id = conversationId)
        );
        if (!conversationMessages) return;

        conversationMessages.messages.findIndex((m) => m.id === messageId);

        conversationMessages.messages.splice(messageId, 1);
      });
  },
});

export const { addMessage, deleteMessage } = messageSlice.actions;

export default messageSlice.reducer;
