import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationType } from "../utils/types";

export interface ConversationsState {
  conversations: ConversationType[];
}

const initialState: ConversationsState = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversations.push(action.payload);
    },
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
