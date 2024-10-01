export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = LoginType & {
  firstName: string;
  lastName: string;
};
