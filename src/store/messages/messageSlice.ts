import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationMessage, MessageEventPayload } from "../../utils/types";
import { fetchMessagesThunk } from "./messageThunk";

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
      const conversationMessage = state.messages.find(
        (cm) => cm.id === conversation.id
      );
      conversationMessage?.messages.unshift(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      const index = state.messages.findIndex((cm) => cm.id === id);
      const exists = state.messages.find((cm) => cm.id === id);
      if (exists) {
        console.log("exists");
        state.messages[index] = action.payload.data;
      } else {
        state.messages.push(action.payload.data);
      }
    });
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
