import { GroupMessageType } from "./../../utils/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupMessage, GroupMessageEventPayload } from "../../utils/types";
import {
  deleteGroupMessageThunk,
  editGroupMessageThunk,
  fetchGroupMessagesThunk,
} from "./groupMessageThunk";
import { RootState } from "..";

export interface GroupMessagesState {
  messages: GroupMessage[];
  loading: boolean;
  errorMessage: string;
}

const initialState: GroupMessagesState = {
  messages: [],
  loading: false,
  errorMessage: "",
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

    deleteGroupMessage: (state, action: PayloadAction<GroupMessageType>) => {
      const groupId = action.payload.group?.id;
      const messageId = action.payload.id;

      const groupMessage = state.messages.find((gm) => gm.id === groupId);
      if (!groupMessage) return;

      const messageIndex = groupMessage.messages.findIndex(
        (m) => m.id === messageId
      );

      groupMessage.messages.splice(messageIndex, 1);
    },

    editGroupMessage: (state, action: PayloadAction<GroupMessageType>) => {
      const groupId = action.payload.group?.id;
      const messageId = action.payload.id;
      const content = action.payload.content;

      const groupMessage = state.messages.find((gm) => gm.id === groupId);
      if (!groupMessage) return;

      const messageIndex = groupMessage.messages.findIndex(
        (m) => m.id === messageId
      );

      groupMessage.messages[messageIndex].content = content;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupMessagesThunk.rejected, (state, action) => {
        state.errorMessage = String(action.error.message);
        state.loading = false;
      })
      .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
        if (!action.payload) return;

        const { id } = action.payload.data;

        const index = state.messages.findIndex((gm) => gm.id === id);
        const exists = state.messages.find((gm) => gm.id === id);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        exists
          ? (state.messages[index] = action.payload.data)
          : state.messages.push(action.payload.data);

        state.loading = false;
      })

      .addCase(deleteGroupMessageThunk.fulfilled, (state, action) => {
        if (!action.payload) return;

        const { groupId, messageId } = action.payload.data;

        const groupMessage = state.messages.find((gm) => (gm.id = groupId));

        if (!groupMessage) return;
        const messageIndex = groupMessage.messages.findIndex(
          (m) => m.id === messageId
        );

        groupMessage.messages.splice(messageIndex, 1);
      })

      .addCase(editGroupMessageThunk.fulfilled, (state, action) => {
        if (!action.payload) return;

        const message = action.payload.data;
        const conversationId = message.group?.id;
        const groupMessage = state.messages.find(
          (cm) => cm.id === conversationId
        );
        if (!groupMessage) return;

        const messageIndex = groupMessage.messages.findIndex(
          (m) => m.id === message.id
        );
        groupMessage.messages[messageIndex] = message;
      });
  },
});

const selectGroupMessages = (state: RootState) => state.groupMessages.messages;
const selectGroupMessageId = (state: RootState, id: number) => id;

export const selectGroupMessage = createSelector(
  [selectGroupMessages, selectGroupMessageId],
  (groupMessages, id) => groupMessages.find((gm) => gm.id === id)
);

export const { addGroupMessage, deleteGroupMessage, editGroupMessage } =
  groupMessagesSlice.actions;
export default groupMessagesSlice.reducer;
