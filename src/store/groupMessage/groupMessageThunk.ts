import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGroupMessagesApi } from "../../utils/api";

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
