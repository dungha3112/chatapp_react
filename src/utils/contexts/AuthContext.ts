import { createContext, Dispatch, SetStateAction } from "react";
import { UserType } from "../types";

type AuthContextType = {
  user: UserType | undefined;
  updateAuthUser: Dispatch<SetStateAction<UserType | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  updateAuthUser: () => {},
});
