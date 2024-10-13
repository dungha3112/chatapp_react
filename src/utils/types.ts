export type UserCredentialsParams = {
  email: string;
  password: string;
};

export type CreateUserParams = UserCredentialsParams & {
  firstName: string;
  lastName: string;
};

export type ConversationType = {
  id: number;
  createdAt: string;
  lastMessageSentAt: string;
  lastMessageSent: MessageType;
  creator: UserType;
  recipient: UserType;
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: UserType;
  conversation: ConversationType;
};

export type UserType = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};
