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
import { toast } from "react-toastify";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "groupMessages/fetch",
  (id: number) => {
    try {
      return fetchGroupMessagesApi(id);
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);

export const deleteGroupMessageThunk = createAsyncThunk(
  "groupMessages/delete",
  ({ messageId, groupId }: DeleteGroupMessageParams) => {
    try {
      return deleteGroupMessageApi({ groupId, messageId });
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);

export const editGroupMessageThunk = createAsyncThunk(
  "groupMessages/edit",
  ({ messageId, groupId, content }: EditGroupMessageParams) => {
    try {
      return editGroupMessageApi({ groupId, messageId, content });
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);
