import { ConversationChatTypeData, UserSidebarItemType } from "./types";

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
    id: "connections",
    pathname: "/connections",
  },
];
