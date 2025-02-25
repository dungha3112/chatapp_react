import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGroupsApi,
  getGroupsApi,
  removeGroupUserApi,
} from "../../utils/api";
import { CreateGroupParams, RemoveGroupUserParams } from "../../utils/types";

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  return getGroupsApi();
});

export const createGroupThunk = createAsyncThunk(
  "group/create",
  (params: CreateGroupParams) => {
    return createGroupsApi(params);
  }
);

export const removeGroupUserThunk = createAsyncThunk(
  "group/remove/user",
  (params: RemoveGroupUserParams) => {
    return removeGroupUserApi(params);
  }
);
