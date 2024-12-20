import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGroupMessagesApi } from "../../utils/api";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "groupMessages/fetch",
  (id: number) => fetchGroupMessagesApi(id)
);
