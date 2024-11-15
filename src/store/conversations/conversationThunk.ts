import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationsApi, postNewConversationApi } from "../../utils/api";
import { CreateConversationParams } from "../../utils/types";

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return await getConversationsApi();
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  async (data: CreateConversationParams) => {
    try {
      return await postNewConversationApi(data);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);
