import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createFriendRequestApi,
  getFriendsApi,
  getFriendsRequestsApi,
} from "../../utils/api";

export const getFriendListThunk = createAsyncThunk("friends/fetch", () =>
  getFriendsApi()
);

export const getFriendRequestListThunk = createAsyncThunk(
  "friends/requests/fetch",
  () => getFriendsRequestsApi()
);

export const createFriendRequestThunk = createAsyncThunk(
  "friends/requests/create",
  (email: string) => createFriendRequestApi(email)
);
