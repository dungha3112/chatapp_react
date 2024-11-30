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

// ConversationChatType
export type ConversationChatType = {
  type: SelectedConversationType;
  lable: string;
};

//CreateConversationParams
export type CreateConversationParams = {
  email: string;
  message: string;
};

//MessageType
export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: UserType;
  conversation: ConversationMessage;
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

// GroupType
export type GroupType = {
  id: number;
  title: string;
  users: UserType[];
  owner: UserType;
  messages: MessageType[];
  createdAt: string;
  lastMessageSentAt: string;
  lastMessageSent: MessageType;
};
