import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PointsType, UserType } from "../utils/types";

export interface GroupRecipientSidebarState {
  showSidebar: boolean;
  showUserContextMenu: boolean;
  selectedUser?: UserType;
  points: PointsType;
}

const initialState: GroupRecipientSidebarState = {
  showSidebar: true,
  showUserContextMenu: false,
  points: { x: 0, y: 0 },
};

export const groupRecipientSidebarSlice = createSlice({
  name: "groupRecipientSidebar",
  initialState,
  reducers: {
    tonggleSidebar: (state, action: PayloadAction<boolean>) => {
      console.log(`state: `, action.payload);

      state.showSidebar = action.payload;
    },
    tongleGroupRecipientContextMenu: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showUserContextMenu = action.payload;
    },

    setSelectedRecipientUser: (state, action: PayloadAction<UserType>) => {
      state.selectedUser = action.payload;
    },

    setGroupRecipientContextMenuLocal: (
      state,
      action: PayloadAction<PointsType>
    ) => {
      // console.log(`change`, action.payload);

      state.points = action.payload;
    },
  },
});

export const {
  tonggleSidebar,
  tongleGroupRecipientContextMenu,
  setSelectedRecipientUser,
  setGroupRecipientContextMenuLocal,
} = groupRecipientSidebarSlice.actions;

export default groupRecipientSidebarSlice.reducer;
