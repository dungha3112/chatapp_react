import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversations/conversationSlice";
import messageReducer from "./messages/messageSlice";
import selectedTypeReducer from "./selectedSlice";
import groupReducer from "./groups/groupSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    message: messageReducer,
    selectedConversationType: selectedTypeReducer,
    group: groupReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false });
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
