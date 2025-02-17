import { createAsyncThunk } from "@reduxjs/toolkit";
import { createGroupsApi, getGroupsApi } from "../../utils/api";
import { CreateGroupParams } from "../../utils/types";
import { toast } from "react-toastify";

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  return getGroupsApi();
});

export const createGroupThunk = createAsyncThunk(
  "group/create",
  (params: CreateGroupParams) => {
    try {
      return createGroupsApi(params);
    } catch (error) {
      toast(String(error), { type: "error" });
    }
  }
);
