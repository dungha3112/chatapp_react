import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteGroupMessageApi,
  fetchGroupMessagesApi,
  editGroupMessageApi,
} from "../../utils/api";
import {
  DeleteGroupMessageParams,
  EditGroupMessageParams,
} from "../../utils/types";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "groupMessages/fetch",
  async (id: number) => {
    try {
      return await fetchGroupMessagesApi(id);
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteGroupMessageThunk = createAsyncThunk(
  "groupMessages/delete",
  ({ messageId, groupId }: DeleteGroupMessageParams) =>
    deleteGroupMessageApi({ groupId, messageId })
);

export const editGroupMessageThunk = createAsyncThunk(
  "groupMessages/edit",
  ({ messageId, groupId, content }: EditGroupMessageParams) =>
    editGroupMessageApi({ groupId, messageId, content })
);
