import React from "react";
export type ContextMenuEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

//UserCredentialsParams
export type UserCredentialsParams = {
  email: string;
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
  email: string;
  message: string;
};

// delete OR Edit last message conversation
export type EditOrDeleteLastMessageConversationSidebarResponse = {
  isEdit: boolean;
  messages?: MessageType[];
  conversationId: number;
  message: MessageType;
};

/**
 * MESSAGE
 */
//MessageType
export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: UserType;
  conversation?: ConversationType;
};

//ConversationMessage
export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};

//UserType
export type UserType = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
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
};

// deleteConversationMessageParams
export type DeleteConversationMessageParams = {
  conversationId: number;
  messageId: number;
};

// DeleteMessageResponse
export type DeleteMessageResponse = {
  messageId: number;
  conversationId: number;
  userId: number;
};

// EditMessageParams
export type EditMessageParams = {
  conversationId: number;
  messageId: number;
  content: string;
};

// EditMessageResponse
export type EditMessageResponse = {
  conversationId: number;
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

// GroupMessageType
export type GroupMessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: UserType;
  group?: GroupType;
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
  groupId: number;
  messageId: number;
};

// DeleteGroupMessageResponse
export type DeleteGroupMessageResponse = {
  groupId: number;
  messageId: number;
};

// delete OR Edit last message conversation siebar
export type EditOrDeleteLastMessageGroupSidebarResponse = {
  isEdit: boolean;
  messages?: GroupMessageType[];
  groupId: number;
  message: GroupMessageType;
};

// EditGroupMessageParams
export type EditGroupMessageParams = {
  groupId: number;
  messageId: number;
  content: string;
};

// AddGroupRecipientParams
export type AddGroupRecipientParams = {
  groupId: number;
  email: string;
};

// AddGroupRecipientResponse
export type AddGroupRecipientResponse = {
  group: GroupType;
  user: UserType;
};

// RemoveGroupUserParams
export type RemoveGroupUserParams = {
  groupId: number;
  removeUserId: number;
};

// UpdateGroupOwnerParams
export type UpdateGroupOwnerParams = {
  groupId: number;
  newOwnerId: number;
};

// UserLeaveGroupParams
export type UserLeaveGroupParams = {
  groupId: number;
};

//GroupParticipantLeftPayload
export type GroupParticipantLeftPayload = {
  group: GroupType;
  userId: number;
};
