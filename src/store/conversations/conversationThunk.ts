import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationsApi, postNewConversationApi } from "../../utils/api";
import { CreateConversationParams } from "../../utils/types";
import { toast } from "react-toastify";

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  () => {
    try {
      return getConversationsApi();
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  (data: CreateConversationParams) => {
    try {
      return postNewConversationApi(data);
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);
