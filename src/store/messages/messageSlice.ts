import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ConversationMessage,
  DeleteMessageResponse,
  MessageEventPayload,
  MessageType,
} from "../../utils/types";
import {
  deleteMessageThunk,
  editMessageThunk,
  fetchMessagesThunk,
} from "./messageThunk";

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

    editMessage: (state, action: PayloadAction<MessageType>) => {
      const message = action.payload;
      const conversationMessage = state.messages.find(
        (cm) => cm.id === message.conversation.id
      );
      if (!conversationMessage) return;

      const messageIndex = conversationMessage.messages.findIndex(
        (m) => m.id === message.id
      );
      conversationMessage.messages[messageIndex] = message;
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

        const messageIndex = conversationMessages.messages.findIndex(
          (m) => m.id === messageId
        );

        conversationMessages.messages.splice(messageIndex, 1);
      })
      .addCase(editMessageThunk.fulfilled, (state, action) => {
        const message = action.payload.data;
        const conversationId = message.conversation.id;
        const conversationMessage = state.messages.find(
          (cm) => cm.id === conversationId
        );
        if (!conversationMessage) return;

        const messageIndex = conversationMessage.messages.findIndex(
          (m) => m.id === message.id
        );
        conversationMessage.messages[messageIndex] = message;
      });
  },
});

const selectConversationMessages = (state: RootState) => state.message.messages;
const selectConversationMessageId = (state: RootState, id: number) => id;
export const selectConversationMessage = createSelector(
  [selectConversationMessages, selectConversationMessageId],
  (conversationMessages, id) => conversationMessages.find((cm) => cm.id === id)
);

export const { addMessage, deleteMessage, editMessage } = messageSlice.actions;

export default messageSlice.reducer;
