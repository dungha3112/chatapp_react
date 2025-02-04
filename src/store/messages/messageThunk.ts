import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteMessageApi,
  editMessageApi,
  getMessagesByConversationIdApi,
} from "../../utils/api";
import { DeleteMessageParams, EditMessageParams } from "../../utils/types";

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    try {
      return await getMessagesByConversationIdApi(id);
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "messages/delete",
  async ({ conversationId, messageId }: DeleteMessageParams) =>
    await deleteMessageApi({ conversationId, messageId })
);

export const editMessageThunk = createAsyncThunk(
  "messages/edit",
  async ({ content, conversationId, messageId }: EditMessageParams) =>
    await editMessageApi({ content, conversationId, messageId })
);
