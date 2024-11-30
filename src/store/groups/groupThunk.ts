import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGroupsApi } from "../../utils/api";

export const fetchGroupsThunk = createAsyncThunk(
  "groups/fetch",
  async () => await getGroupsApi()
);
