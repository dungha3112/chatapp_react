//UserCredentialsParams
export type UserCredentialsParams = {
  email: string;
  password: string;
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
export type EditOrDeleteLastMessageConversationResponse = {
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

// deleteMessageParams
export type DeleteMessageParams = {
  conversationId: number;
  messageId: number;
};

// DeleteMessageResponse
export type DeleteMessageResponse = {
  conversationId: number;
  messageId: number;
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
