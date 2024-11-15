import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessagesByConversationIdApi } from "../../utils/api";

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => await getMessagesByConversationIdApi(id)
);
