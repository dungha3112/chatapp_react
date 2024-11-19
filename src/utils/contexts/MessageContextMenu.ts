import { createContext, Dispatch, SetStateAction } from "react";
import { MessageType } from "../types";

type MessageContextMenuType = {
  message: MessageType | null;
  setMessage: Dispatch<SetStateAction<MessageType | null>>;
};

export const MessageContextMenu = createContext<MessageContextMenuType>({
  message: null,
  setMessage: () => {},
});
