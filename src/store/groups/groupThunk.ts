import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGroupsApi,
  getGroupsApi,
  updateGroupOwnerApi,
  removeGroupUserApi,
  userLeaveGroupApi,
} from "../../utils/api";
import {
  CreateGroupParams,
  RemoveGroupUserParams,
  UpdateGroupOwnerParams,
  UserLeaveGroupParams,
} from "../../utils/types";
import { useToast } from "../../utils/hooks/useToast";

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  const { error } = useToast();
  try {
    return getGroupsApi();
  } catch (err) {
    error(String(err));
  }
});

export const createGroupThunk = createAsyncThunk(
  "group/create",
  (params: CreateGroupParams) => {
    const { error } = useToast();
    try {
      return createGroupsApi(params);
    } catch (err) {
      error(String(err));
    }
  }
);

export const removeGroupUserThunk = createAsyncThunk(
  "group/remove/user",
  (params: RemoveGroupUserParams) => {
    const { error } = useToast();
    try {
      return removeGroupUserApi(params);
    } catch (err) {
      error(String(err));
    }
  }
);

export const updateGroupOwnerThunk = createAsyncThunk(
  "group/update/owner",
  (params: UpdateGroupOwnerParams) => {
    const { error } = useToast();
    try {
      return updateGroupOwnerApi(params);
    } catch (err) {
      error(String(err));
    }
  }
);

export const userLeaveGroupThunk = createAsyncThunk(
  "group/user/leave",
  async (params: UserLeaveGroupParams) => {
    const { error } = useToast();
    try {
      return await userLeaveGroupApi(params);
    } catch (err) {
      error(String(err));
    }
  }
);
