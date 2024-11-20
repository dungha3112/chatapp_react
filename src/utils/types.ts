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
}