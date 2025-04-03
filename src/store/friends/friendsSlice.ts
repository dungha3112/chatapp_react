import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FriendNavType,
  FriendRequestAcceptResponse,
  FriendRequestType,
  ProfileType,
  UserProfileModalType,
} from "../../utils/types";
import { FriendType } from "./../../utils/types";
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  createFriendRequestThunk,
  deleteFriendThunk,
  getFriendListThunk,
  getFriendRejectedRequestListThunk,
  getFriendRequestListThunk,
  rejectFriendRequestThunk,
} from "./friendsThunk";

export interface FriendsState {
  loadingFriend: boolean;
  friendNavType: FriendNavType;
  friends: FriendType[];
  friendRequests: FriendRequestType[];

  friendRejectedRequests: FriendRequestType[];

  friendOnlines: FriendType[];

  userProfile?: ProfileType | null;
  openModalUserProfile: boolean;
}

const initialState: FriendsState = {
  loadingFriend: false,
  friends: [],
  friendRequests: [],
  friendRejectedRequests: [],
  friendNavType: "friendList",

  friendOnlines: [],

  openModalUserProfile: false,
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
      state.friendRejectedRequests = state.friendRejectedRequests.filter(
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

    deleteFriend: (state, action: PayloadAction<FriendType>) => {
      state.friends = state.friends.filter((fr) => fr.id !== action.payload.id);
    },

    onChangeFriendNavType: (state, action: PayloadAction<FriendNavType>) => {
      state.friendNavType = action.payload;
    },

    setFriendOnline: (state, action: PayloadAction<FriendType[]>) => {
      state.friendOnlines = action.payload;
    },

    handleUserProfileModal: (
      state,
      action: PayloadAction<UserProfileModalType>
    ) => {
      state.openModalUserProfile = action.payload.openModalUserProfile;
      state.userProfile = action.payload.userProfile;
    },
    //
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
      state.friendRejectedRequests = state.friendRequests.filter(
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

      state.friendRejectedRequests = state.friendRejectedRequests.filter(
        (fr) => fr.id !== friendRequest.id
      );

      state.friendRequests = state.friendRequests.filter(
        (fr) => fr.id !== friendRequest.id
      );
    });

    builder.addCase(
      getFriendRejectedRequestListThunk.fulfilled,
      (state, action) => {
        if (!action.payload) return;
        state.friendRejectedRequests = action.payload.data;
      }
    );

    builder.addCase(deleteFriendThunk.fulfilled, (state, action) => {
      state.friends = state.friends.filter(
        (fr) => fr.id !== action.payload?.data.id
      );
    });
  },
});

export const {
  addFriendRequest,
  removeFriendRequest,
  addAcceptFriend,
  onChangeFriendNavType,
  deleteFriend,
  setFriendOnline,
  handleUserProfileModal,
} = friendsSlice.actions;

export default friendsSlice.reducer;
