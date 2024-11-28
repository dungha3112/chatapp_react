import { createContext, Dispatch, SetStateAction } from "react";
import { MessageType } from "../types";

type MessageContextMenuType = {
  message: MessageType | null;
  setMessage: Dispatch<SetStateAction<MessageType | null>>;

  setIsEditMessage: Dispatch<SetStateAction<boolean>>;

  editMessage: MessageType | null;
  setEditMessage: Dispatch<SetStateAction<MessageType | null>>;
};

export const MessageContextMenu = createContext<MessageContextMenuType>({
  message: null,
  setMessage: () => {},

  setIsEditMessage: () => {},

  editMessage: null,
  setEditMessage: () => {},
});
