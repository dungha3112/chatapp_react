import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  acceptFriendRequestApi,
  rejectFriendRequestApi,
  createFriendRequestApi,
  getFriendsApi,
  getFriendsRequestsApi,
  cancelFriendRequestApi,
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

export const cancelFriendRequestThunk = createAsyncThunk(
  "friends/requests/cancel",
  (id: number) => cancelFriendRequestApi(id)
);

export const rejectFriendRequestThunk = createAsyncThunk(
  "friends/requests/reject",
  (id: number) => rejectFriendRequestApi(id)
);

export const acceptFriendRequestThunk = createAsyncThunk(
  "friends/requests/accept",
  (id: number) => acceptFriendRequestApi(id)
);
