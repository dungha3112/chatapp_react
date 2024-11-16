import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ConversationType } from "../../utils/types";
import {
  createConversationThunk,
  fetchConversationsThunk,
} from "./conversationThunk";

export interface ConversationsState {
  conversations: ConversationType[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
};

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<ConversationType>) => {
      const conversation = action.payload;

      const index: number = state.conversations.findIndex(
        (c) => c.id === conversation.id
      );
      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
      });
  },
});

const selectConversations = (state: RootState) =>
  state.conversation.conversations;
const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) =>
    conversations.find((c) => c.id === conversationId)
);

export const { addConversation, updateConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
