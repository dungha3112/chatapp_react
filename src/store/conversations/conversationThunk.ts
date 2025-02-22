import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversationsApi, postNewConversationApi } from "../../utils/api";
import { CreateConversationParams } from "../../utils/types";
import { useToast } from "../../utils/hooks/useToast";
import { toast } from "react-toastify";

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
    return postNewConversationApi(data);
    // const { error } = useToast();
    // try {
    // } catch (err) {
    //   console.log(err);

    //   toast(String(err), { type: "error" });
    // }
  }
);
