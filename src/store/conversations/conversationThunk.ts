import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationsApi, postNewConversationApi } from "../../utils/api";
import { useToast } from "../../utils/hooks/useToast";
import { CreateConversationParams } from "../../utils/types";

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  () => {
    const { error } = useToast();
    try {
      return getConversationsApi();
    } catch (err) {
      error(String(err));
    }
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  (data: CreateConversationParams) => {
    const { error } = useToast();
    try {
      return postNewConversationApi(data);
    } catch (err) {
      error(String(err));
    }
  }
);
