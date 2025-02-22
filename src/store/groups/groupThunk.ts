import { createAsyncThunk } from "@reduxjs/toolkit";
import { createGroupsApi, getGroupsApi } from "../../utils/api";
import { CreateGroupParams } from "../../utils/types";

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  return getGroupsApi();
});

export const createGroupThunk = createAsyncThunk(
  "group/create",
  (params: CreateGroupParams) => {
    return createGroupsApi(params);
  }
);
