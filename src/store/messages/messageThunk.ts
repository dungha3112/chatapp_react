import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteMessageApi,
  editMessageApi,
  getMessagesByConversationIdApi,
} from "../../utils/api";
import {
  DeleteConversationMessageParams,
  EditMessageParams,
} from "../../utils/types";

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

export const deleteConversationMessageThunk = createAsyncThunk(
  "messages/delete",
  async ({ conversationId, messageId }: DeleteConversationMessageParams) =>
    await deleteMessageApi({ conversationId, messageId })
);

export const editConversationMessageThunk = createAsyncThunk(
  "messages/edit",
  async ({ content, conversationId, messageId }: EditMessageParams) =>
    await editMessageApi({ content, conversationId, messageId })
);
