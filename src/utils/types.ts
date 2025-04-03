import React from "react";

export type ContextMenuEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type DivMouseEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type InputChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type DragEventType = React.DragEvent<HTMLTextAreaElement>;
export type ClipboardEventType = React.ClipboardEvent<HTMLTextAreaElement>;
//UserCredentialsParams
export type UserCredentialsParams = {
  username: string;
  password: string;
};

export type PointsType = {
  x: number;
  y: number;
};

//CreateUserParams
export type CreateUserParams = UserCredentialsParams & {
  firstName: string;
  lastName: string;
};

/**
 * CONVERSATION
 */
//ConversationType
export type ConversationType = {
  id: number;
  createdAt: string;
  lastMessageSentAt: string;
  lastMessageSent: MessageType;
  creator: UserType;
  recipient: UserType;
};

// selected conversation type
export type SelectedConversationType = "group" | "private";

// ConversationChatTypeData
export type ConversationChatTypeData = {
  type: SelectedConversationType;
  lable: string;
};

//CreateConversationParams
export type CreateConversationParams = {
  username: string;
  message: string;
};

// delete OR Edit last message conversation
export type EditOrDeleteLastMessageConversationSidebarResponse = {
  isEdit: boolean;
  messages?: MessageType[];
  id: number;
  message: MessageType;
};

/**
 * MESSAGE
 */
//MessageType
export type MessageAttachment = {
  key: string;
  secure_url: string;
  public_id: string;
  type: string;
};
export type MessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: UserType;
  conversation?: ConversationType;
  attachments?: MessageAttachment[];
};

//ConversationMessage
export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};

//UserType
export type UserType = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profile?: ProfileType;
};

// ProfileType
export type ProfileType = {
  id: number;
  about?: string;
  avatar?: { secure_url: string; public_id: string };
  banner?: { secure_url: string; public_id: string };
};

//MessageEventPayload
export type MessageEventPayload = {
  message: MessageType;
  conversation: ConversationType;
};

// FetchMessagePayload
export type FetchMessagePayload = {
  id: number;
  messages: MessageType[];
  count: number;
};

// deleteConversationMessageParams
export type DeleteConversationMessageParams = {
  id: number;
  messageId: number;
};

// DeleteMessageResponse
export type DeleteMessageResponse = {
  messageId: number;
  id: number;
  userId: number;
};

// EditMessageParams
export type EditMessageParams = {
  id: number;
  messageId: number;
  content?: string;
};

// EditMessageResponse
export type EditMessageResponse = {
  id: number;
  userId: number;
  content: string;
  messageId: number;
};

/**
 * Group
 */

export type GroupMessage = {
  id: number;
  messages: GroupMessageType[];
};

export type GroupMessageAttachment = {
  key: string;
  secure_url: string;
  public_id: string;
  type: string;
};

// GroupMessageType
export type GroupMessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: UserType;
  group?: GroupType;
  attachments: GroupMessageAttachment[];
};

// GroupType
export type GroupType = {
  id: number;
  title: string;
  users: UserType[];
  owner: UserType;
  messages: GroupMessageType[];
  createdAt: string;
  lastMessageSentAt: string;
  lastMessageSent: GroupMessageType;
};

// GroupMessageEventPayload
export type GroupMessageEventPayload = {
  message: GroupMessageType;
  group: GroupType;
};

// FetchGroupMessagePayload
export type FetchGroupMessagePayload = {
  id: number;
  messages: GroupMessageType[];
};

// CreateGroupParams
export type CreateGroupParams = {
  users: string[];
  title: string;
  message: string;
};

// DeleteGroupMessageParams
export type DeleteGroupMessageParams = {
  id: number;
  messageId: number;
};

// DeleteGroupMessageResponse
export type DeleteGroupMessageResponse = {
  id: number;
  messageId: number;
};

// delete OR Edit last message conversation siebar
export type EditOrDeleteLastMessageGroupSidebarResponse = {
  isEdit: boolean;
  messages?: GroupMessageType[];
  id: number;
  message: GroupMessageType;
};

// EditGroupMessageParams
export type EditGroupMessageParams = {
  id: number;
  messageId: number;
  content?: string;
};

// AddGroupRecipientParams
export type AddGroupRecipientParams = {
  id: number;
  username: string;
};

// AddGroupRecipientResponse
export type AddGroupRecipientResponse = {
  group: GroupType;
  user: UserType;
};

// RemoveGroupUserParams
export type RemoveGroupUserParams = {
  id: number;
  removeUserId: number;
};

// UpdateGroupOwnerParams
export type UpdateGroupOwnerParams = {
  id: number;
  newOwnerId: number;
};

// UserLeaveGroupParams
export type UserLeaveGroupParams = {
  id: number;
};

//GroupParticipantLeftPayload
export type GroupParticipantLeftPayload = {
  group: GroupType;
  userId: number;
};

// FriendType
export type FriendType = {
  id: number;
  sender: UserType;
  receiver: UserType;
  createdAt: string;
};

// FriendRequestType
export type FriendRequestType = {
  id: number;
  sender: UserType;
  receiver: UserType;
  createdAt: string;
  status: FriendRequestStatusType;
};
export type FriendRequestStatusType = "accepted" | "pending" | "rejected";

//FriendRequestAcceptResponse
export type FriendRequestAcceptResponse = {
  friend: FriendType;
  friendRequest: FriendRequestType;
};

export type FriendNavType =
  | "friendList"
  | "requests"
  | "rejected"
  | "addFriend";

export type UserSidebarRouteType =
  | "conversations"
  | "friends"
  | "connections"
  | "settings";
export type UserSidebarItemType = {
  id: UserSidebarRouteType;
  pathname: string;
};

export type SettingsSidebarRouteType =
  | "profile"
  | "security"
  | "notifications"
  | "integrations"
  | "appearance";

export type SettingsItemType = {
  id: SettingsSidebarRouteType;
  label: string;
  pathname: string;
};

export type AttachmentType = {
  id: number;
  file: File;
};

export type UserProfileModalType = {
  userProfile?: ProfileType | null;
  openModalUserProfile: boolean;
};
