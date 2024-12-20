import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupMessage, GroupMessageEventPayload } from "../../utils/types";
import { fetchGroupMessagesThunk } from "./groupMessageThunk";

export interface GroupMessagesState {
  messages: GroupMessage[];
}

const initialState: GroupMessagesState = {
  messages: [],
};

export const groupMessagesSlice = createSlice({
  name: "groupMessages",
  initialState,
  reducers: {
    addGroupMessage: (
      state,
      action: PayloadAction<GroupMessageEventPayload>
    ) => {
      const { group, message } = action.payload;
      const groupMessage = state.messages.find((gm) => gm.id === group.id);
      groupMessage?.messages.unshift(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      console.log(action.payload.data);

      const index = state.messages.findIndex((gm) => gm.id === id);
      const exists = state.messages.find((gm) => gm.id === id);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      exists
        ? (state.messages[index] = action.payload.data)
        : state.messages.push(action.payload.data);
    });
  },
});

export const { addGroupMessage } = groupMessagesSlice.actions;
export default groupMessagesSlice.reducer;
