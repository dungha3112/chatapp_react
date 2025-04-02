import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteMessageApi,
  editMessageApi,
  getMessagesByidApi,
} from "../../utils/api";
import {
  DeleteConversationMessageParams,
  EditMessageParams,
} from "../../utils/types";
import { toast } from "react-toastify";

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  (id: number) => getMessagesByidApi(id)
);

export const deleteConversationMessageThunk = createAsyncThunk(
  "messages/delete",
  ({ id, messageId }: DeleteConversationMessageParams) => {
    try {
      return deleteMessageApi({ id, messageId });
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);

export const editConversationMessageThunk = createAsyncThunk(
  "messages/edit",
  ({ content, id, messageId }: EditMessageParams) => {
    try {
      return editMessageApi({ content, id, messageId });
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);
