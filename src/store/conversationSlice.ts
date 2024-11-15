import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationType } from "../utils/types";
import { getConversationsApi } from "../utils/api";

export interface ConversationsState {
  conversations: ConversationType[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return await getConversationsApi();
  }
);

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversations.push(action.payload);
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
      });
  },
});

export const { addConversation, updateConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
