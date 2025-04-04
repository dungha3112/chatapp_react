import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ConversationType,
  EditOrDeleteLastMessageConversationSidebarResponse,
  PayloadTypingType,
} from "../../utils/types";
import {
  createConversationThunk,
  fetchConversationsThunk,
} from "./conversationThunk";

export interface ConversationsState {
  conversations: ConversationType[];
  loading: boolean;
  conversationsTyping: PayloadTypingType[];
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
  conversationsTyping: [],
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
      const { isEdit, messages, message, id } = action.payload;

      const conversation = state.conversations.find((c) => c.id === id);

      const index = state.conversations.findIndex((c) => c.id === id);

      const isLastMessageSent = conversation?.lastMessageSent.id === message.id;

      if (!isLastMessageSent) return;
      if (isEdit) {
        state.conversations[index].lastMessageSent = message;
      } else {
        if (!messages) return;

        state.conversations[index].lastMessageSent = messages[1];
      }
    },

    handleConversationStartTyping: (
      state,
      action: PayloadAction<PayloadTypingType>
    ) => {
      state.conversationsTyping.push(action.payload);
    },
    handleRemoveConversationStopTyping: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.conversationsTyping = state.conversationsTyping.filter(
        (conver) => conver.id !== action.payload.id
      );
    },
    //
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
const selectid = (state: RootState, id: number) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectid],
  (conversations, id) => conversations.find((c) => c.id === id)
);

export const {
  addConversation,
  updateConversation,
  editOrDeleteLastMessageConversationSidebar,
  handleConversationStartTyping,
  handleRemoveConversationStopTyping,
} = conversationSlice.actions;

export default conversationSlice.reducer;
