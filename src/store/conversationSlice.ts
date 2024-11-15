import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationType, CreateConversationParams } from "../utils/types";
import { getConversationsApi, postNewConversationApi } from "../utils/api";

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

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  async (data: CreateConversationParams) => {
    return await postNewConversationApi(data);
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
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
      });
  },
});

export const { addConversation, updateConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
