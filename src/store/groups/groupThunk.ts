import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGroupsApi,
  getGroupsApi,
  updateGroupOwnerApi,
  removeGroupUserApi,
} from "../../utils/api";
import {
  CreateGroupParams,
  RemoveGroupUserParams,
  UpdateGroupOwnerParams,
} from "../../utils/types";

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

export const updateGroupOwnerThunk = createAsyncThunk(
  "group/update/owner",
  (params: UpdateGroupOwnerParams) => {
    return updateGroupOwnerApi(params);
  }
);
