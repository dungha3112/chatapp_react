import { createSlice } from "@reduxjs/toolkit";
import { FriendRequestType, FriendType } from "../../utils/types";
import {
  createFriendRequestThunk,
  getFriendListThunk,
  getFriendRequestListThunk,
} from "./friendsThunk";

export interface FriendsState {
  loadingFriend: boolean;
  friends: FriendType[];
  friendRequests: FriendRequestType[];
}

const initialState: FriendsState = {
  loadingFriend: false,
  friends: [],
  friendRequests: [],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriendListThunk.pending, (state) => {
        state.loadingFriend = true;
      })
      .addCase(getFriendListThunk.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.friends = action.payload.data;
        state.loadingFriend = false;
      })
      .addCase(getFriendListThunk.rejected, (state) => {
        state.loadingFriend = false;
      });

    builder.addCase(getFriendRequestListThunk.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.friendRequests = action.payload.data;
    });

    builder.addCase(createFriendRequestThunk.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.friendRequests.push(action.payload.data);
    });
  },
});

export const {} = friendsSlice.actions;

export default friendsSlice.reducer;
