import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationType } from "../utils/types";
import { getConversationsApi } from "../utils/api";

export interface ConversationsState {
  conversations: ConversationType[];
}

const initialState: ConversationsState = {
  conversations: [],
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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      state.conversations = action.payload.data;
    });
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
