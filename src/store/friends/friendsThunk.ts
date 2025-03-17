import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  acceptFriendRequestApi,
  rejectFriendRequestApi,
  createFriendRequestApi,
  getFriendsApi,
  getFriendsRequestsApi,
  cancelFriendRequestApi,
  getFriendRejectedRequestsApi,
  deleteFriendApi,
} from "../../utils/api";

/**
 * Friend
 */

export const getFriendListThunk = createAsyncThunk("friends/fetch", () =>
  getFriendsApi()
);

export const deleteFriendThunk = createAsyncThunk(
  "friends/delete",
  (id: number) => deleteFriendApi(id)
);

/**
 * Friend requests
 */

export const getFriendRequestListThunk = createAsyncThunk(
  "friends/requests/fetch",
  () => getFriendsRequestsApi()
);

export const getFriendRejectedRequestListThunk = createAsyncThunk(
  "friends/requests/rejected/fetch",
  () => getFriendRejectedRequestsApi()
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
