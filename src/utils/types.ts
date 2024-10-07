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
  firstName: string;
  lastName: string;
  lastMessageSent: string;
};

export type UserType = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};
