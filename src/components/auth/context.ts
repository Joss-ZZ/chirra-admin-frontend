import { createContext } from "react";
import { useAuth } from "../../hooks";

export type ContextProps = ReturnType<typeof useAuth>;

export const AuthContext = createContext<ContextProps>({
  isAuthenticated: false,
  isAdmin: false,
  isLoadingAuth: false,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});
