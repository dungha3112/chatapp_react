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
import { toast } from "react-toastify";

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    try {
      return await getMessagesByConversationIdApi(id);
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);

export const deleteConversationMessageThunk = createAsyncThunk(
  "messages/delete",
  async ({ conversationId, messageId }: DeleteConversationMessageParams) => {
    try {
      return await deleteMessageApi({ conversationId, messageId });
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);

export const editConversationMessageThunk = createAsyncThunk(
  "messages/edit",
  ({ content, conversationId, messageId }: EditMessageParams) => {
    try {
      return editMessageApi({ content, conversationId, messageId });
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);
