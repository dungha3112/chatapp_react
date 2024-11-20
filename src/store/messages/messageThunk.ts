import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteMessageApi,
  getMessagesByConversationIdApi,
} from "../../utils/api";
import { DeleteMessageParams } from "../../utils/types";

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => await getMessagesByConversationIdApi(id)
);

export const deleteMessageThunk = createAsyncThunk(
  "messages/delete",
  async ({ conversationId, messageId }: DeleteMessageParams) =>
    await deleteMessageApi({ conversationId, messageId })
);
