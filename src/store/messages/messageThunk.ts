import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteMessageApi,
  editMessageApi,
  getMessagesByidApi,
} from "../../utils/api";
import { useToast } from "../../utils/hooks/useToast";
import {
  DeleteConversationMessageParams,
  EditMessageParams,
} from "../../utils/types";

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  (id: number) => {
    const { error } = useToast();
    try {
      return getMessagesByidApi(id);
    } catch (err) {
      error(String(err));
    }
  }
);

export const deleteConversationMessageThunk = createAsyncThunk(
  "messages/delete",
  ({ id, messageId }: DeleteConversationMessageParams) => {
    const { error } = useToast();
    try {
      return deleteMessageApi({ id, messageId });
    } catch (err) {
      error(String(err));
    }
  }
);

export const editConversationMessageThunk = createAsyncThunk(
  "messages/edit",
  ({ content, id, messageId }: EditMessageParams) => {
    const { error } = useToast();
    try {
      return editMessageApi({ content, id, messageId });
    } catch (err) {
      error(String(err));
    }
  }
);
