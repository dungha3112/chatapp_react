export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = LoginType & {
  firstName: string;
  lastName: string;
};

export type ConversationType = {
  id: number;
  firstName: string;
  lastName: string;
  lastMessageSent: string;
};
