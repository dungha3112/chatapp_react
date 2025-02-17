import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ConversationType,
  EditOrDeleteLastMessageConversationSidebarResponse,
} from "../../utils/types";
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
    editOrDeleteLastMessageConversationSidebar: (
      state,
      action: PayloadAction<EditOrDeleteLastMessageConversationSidebarResponse>
    ) => {
      console.log("editOrDeleteLastMessageConversation");

      const { isEdit, messages, message, conversationId } = action.payload;

      const conversation = state.conversations.find(
        (c) => c.id === conversationId
      );

      const index = state.conversations.findIndex(
        (c) => c.id === conversationId
      );

      const isLastMessageSent = conversation?.lastMessageSent.id === message.id;

      if (!isLastMessageSent) return;
      if (isEdit) {
        console.log("edit message last sent conversation");

        state.conversations[index].lastMessageSent = message;
      } else {
        if (!messages) return;
        console.log("delete message last sent conversation");

        state.conversations[index].lastMessageSent = messages[1];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.conversations = action.payload.data;
        } else {
          state.conversations = [];
        }
        state.loading = false;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        if (action.payload?.data)
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

export const {
  addConversation,
  updateConversation,
  editOrDeleteLastMessageConversationSidebar,
} = conversationSlice.actions;

export default conversationSlice.reducer;
