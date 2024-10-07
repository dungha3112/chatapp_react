import { createContext } from "react";
import { UserType } from "../types";

type AuthContextType = {
  user?: UserType;
  updateAuthUser: (data: UserType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});
