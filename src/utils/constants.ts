import {
  ConversationChatTypeData,
  SettingsItemType,
  UserSidebarItemType,
} from "./types";

export const WIDTH_SIDE_BAR = 265;

export const chatTypes: ConversationChatTypeData[] = [
  { type: "private", lable: "Private" },
  { type: "group", lable: "Group" },
];

export const friendsNavbarItems = [
  {
    id: "friendList",
    label: "Friend List",
  },
  {
    id: "requests",
    label: "Pending",
  },
  {
    id: "rejected",
    label: "Rejected",
  },

  {
    id: "addFriend",
    label: "Add Friend",
  },
];

export const userSidebarItems: UserSidebarItemType[] = [
  {
    id: "conversations",
    pathname: "/conversations",
  },
  {
    id: "friends",
    pathname: "/friends",
  },
  {
    id: "settings",
    pathname: "/settings",
  },
  {
    id: "connections",
    pathname: "/connections",
  },
];

export const settingsItems: SettingsItemType[] = [
  {
    id: "profile",
    label: "Profile",
    pathname: "/settings/profile",
  },
  // {
  //   id: "security",
  //   label: "Security",
  //   pathname: "/settings/security",
  // },
  // {
  //   id: "notifications",
  //   label: "Notifications",
  //   pathname: "/settings/notifications",
  // },
  // {
  //   id: "integrations",
  //   label: "Integrations",
  //   pathname: "/settings/integrations",
  // },
  {
    id: "appearance",
    label: "Appearance",
    pathname: "/settings/appearance",
  },
];
