import {
  IoIosLock,
  IoIosNotifications,
  IoIosPerson,
  IoMdColorPalette,
  IoMdInfinite,
} from "react-icons/io";
import {
  ConversationType,
  FriendType,
  GroupType,
  SettingsSidebarRouteType,
  UserType,
} from "./types";

export const getRecipientFromConversation = (
  conversation?: ConversationType,
  user?: UserType
) => {
  return user?.id === conversation?.creator?.id
    ? conversation?.recipient
    : conversation?.creator;
};

export const isGroupOwner = (user?: UserType, group?: GroupType) =>
  user?.id === group?.owner.id;

export const isUserGroup = (user?: UserType, group?: GroupType) =>
  group?.users.find((u) => u.id === user?.id);

export const getUserFriendInstance = (user?: UserType, friend?: FriendType) =>
  user?.id === friend?.receiver.id ? friend?.sender : friend?.receiver;

export const getSettingSidebarIcon = (id: SettingsSidebarRouteType) => {
  switch (id) {
    case "profile":
      return IoIosPerson;
    case "security":
      return IoIosLock;
    case "notifications":
      return IoIosNotifications;
    case "integrations":
      return IoMdInfinite;
    case "appearance":
      return IoMdColorPalette;
  }
};
