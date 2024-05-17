import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { User } from "../entities";

export interface AuthSlice {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser(user: User | null): void;
  setToken(token: string | null): void;
  setIsAuthenticated(isAuthenticated: boolean): void;
  setIsAdmin(isAdmin: boolean): void;
}

export const useAuthStore = create<AuthSlice>()(
  immer((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
    setIsAdmin(isAdmin: boolean) {
      set((state) => {
        state.isAdmin = isAdmin;
      });
    },
    setIsAuthenticated(isAuthenticated: boolean) {
      set((state) => {
        state.isAuthenticated = isAuthenticated;
      });
    },
    setUser(user) {
      set((state) => {
        state.user = user;
      });
    },
    setToken(token) {
      set((state) => {
        state.token = token;
      });
    },
  }))
);
