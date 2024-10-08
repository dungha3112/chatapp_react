import { createContext } from "react";
import { UserType } from "../types";

type AuthContextType = {
  user: UserType | undefined;
  updateAuthUser: (data: UserType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  updateAuthUser: () => {},
});
