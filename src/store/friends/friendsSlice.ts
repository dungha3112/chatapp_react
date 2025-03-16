import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FriendRequestAcceptResponse,
  FriendRequestType,
} from "../../utils/types";
import { FriendType } from "./../../utils/types";
import {
  acceptFriendRequestThunk,
  rejectFriendRequestThunk,
  createFriendRequestThunk,
  getFriendListThunk,
  getFriendRequestListThunk,
  cancelFriendRequestThunk,
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
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequestType>) => {
      state.friendRequests.push(action.payload);
    },
    removeFriendRequest: (state, action: PayloadAction<FriendRequestType>) => {
      state.friendRequests = state.friendRequests.filter(
        (fr) => fr.id !== action.payload.id
      );
    },

    addAcceptFriend: (
      state,
      action: PayloadAction<FriendRequestAcceptResponse>
    ) => {
      const { friend, friendRequest } = action.payload;
      state.friends.push(friend);
      state.friendRequests = state.friendRequests.filter(
        (fr) => fr.id !== friendRequest.id
      );
    },
  },
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

    builder.addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (fr) => fr.id !== action.payload?.data.id
      );
    });

    builder.addCase(rejectFriendRequestThunk.fulfilled, (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (fr) => fr.id !== action.payload?.data.id
      );
    });

    builder.addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
      if (!action.payload?.data) return;
      const { friend, friendRequest } = action.payload.data;
      state.friends.push(friend);

      const indexReques = state.friendRequests.findIndex(
        (f) => f.id === friendRequest.id
      );
      const request = state.friendRequests.find(
        (f) => f.id === friendRequest.id
      );
      if (!request) return;
      state.friendRequests.splice(indexReques, 1);
    });
  },
});

export const { addFriendRequest, removeFriendRequest, addAcceptFriend } =
  friendsSlice.actions;

export default friendsSlice.reducer;
