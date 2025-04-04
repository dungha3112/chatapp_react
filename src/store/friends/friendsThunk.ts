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
import { useToast } from "../../utils/hooks/useToast";
/**
 * Friend
 */

export const getFriendListThunk = createAsyncThunk("friends/fetch", () => {
  const { error } = useToast();
  try {
    return getFriendsApi();
  } catch (err) {
    error(String(err));
  }
});

export const deleteFriendThunk = createAsyncThunk(
  "friends/delete",
  (id: number) => {
    const { error } = useToast();

    try {
      return deleteFriendApi(id);
    } catch (err) {
      error(String(err));
    }
  }
);

/**
 * Friend requests
 */

export const getFriendRequestListThunk = createAsyncThunk(
  "friends/requests/fetch",
  () => {
    const { error } = useToast();

    try {
      return getFriendsRequestsApi();
    } catch (err) {
      error(String(err));
    }
  }
);

export const getFriendRejectedRequestListThunk = createAsyncThunk(
  "friends/requests/rejected/fetch",
  () => {
    const { error } = useToast();

    try {
      getFriendRejectedRequestsApi();
    } catch (err) {
      error(String(err));
    }
  }
);

export const createFriendRequestThunk = createAsyncThunk(
  "friends/requests/create",
  (username: string) => {
    const { error } = useToast();
    try {
      return createFriendRequestApi(username);
    } catch (err) {
      error(String(err));
    }
  }
);

export const cancelFriendRequestThunk = createAsyncThunk(
  "friends/requests/cancel",
  (id: number) => {
    const { error } = useToast();
    try {
      return cancelFriendRequestApi(id);
    } catch (err) {
      error(String(err));
    }
  }
);

export const rejectFriendRequestThunk = createAsyncThunk(
  "friends/requests/reject",
  (id: number) => {
    const { error } = useToast();
    try {
      return rejectFriendRequestApi(id);
    } catch (err) {
      error(String(err));
    }
  }
);

export const acceptFriendRequestThunk = createAsyncThunk(
  "friends/requests/accept",
  (id: number) => {
    const { error } = useToast();
    try {
      acceptFriendRequestApi(id);
    } catch (err) {
      error(String(err));
    }
  }
);
