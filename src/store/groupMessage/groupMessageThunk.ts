import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteGroupMessageApi,
  editGroupMessageApi,
  fetchGroupMessagesApi,
} from "../../utils/api";
import { useToast } from "../../utils/hooks/useToast";
import {
  DeleteGroupMessageParams,
  EditGroupMessageParams,
} from "../../utils/types";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "groupMessages/fetch",
  (id: number) => {
    const { error } = useToast();
    try {
      return fetchGroupMessagesApi(id);
    } catch (err) {
      error(String(err));
    }
  }
);

export const deleteGroupMessageThunk = createAsyncThunk(
  "groupMessages/delete",
  ({ messageId, id }: DeleteGroupMessageParams) => {
    const { error } = useToast();
    try {
      return deleteGroupMessageApi({ id, messageId });
    } catch (err) {
      error(String(err));
    }
  }
);

export const editGroupMessageThunk = createAsyncThunk(
  "groupMessages/edit",
  ({ messageId, id, content }: EditGroupMessageParams) => {
    const { error } = useToast();
    try {
      return editGroupMessageApi({ id, messageId, content });
    } catch (err) {
      error(String(err));
    }
  }
);
