import { SignInDto, authApi } from "../api";
import { useAuthStore } from "../store";
import { useCallback, useEffect, useState } from "react";
import localforage from "localforage";
import { User } from "../entities";
import { TOKEN_KEY, USER_KEY } from "../constants";
import { asyncWrapper } from "../utils/async-wrapper";
import { Toast } from "../utils/toast";

export const useAuth = () => {
  const {
    setToken,
    setUser,
    setIsAuthenticated,
    isAuthenticated,
    user,
    setIsAdmin,
    isAdmin,
  } = useAuthStore();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const check = useCallback(async () => {
    const token = await localforage.getItem<string>(TOKEN_KEY);
    const user = await localforage.getItem<User>(USER_KEY);
    if (token && user) {
      setToken(token);
      setUser(user);
      setIsAdmin(user.profiles.type === "ADMINISTRADOR");
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }, [
    setIsAuthenticated,
    setToken,
    setUser,
    setIsAdmin,
  ]);

  const signIn = async (data: SignInDto) => {
    asyncWrapper(async () => {
      const response = await authApi.signIn(data);
      await localforage.setItem(TOKEN_KEY, response.result.token);
      await localforage.setItem(USER_KEY, response.result.user);
      setToken(response.result.token);
      setUser(response.result.user);
      setIsAuthenticated(true);
      Toast.success(`Bienvenido ${response.result.user.firstname}`);
    }, setIsLoadingAuth);
  };

  const signOut = () => {
    asyncWrapper(async () => {
      await localforage.removeItem(TOKEN_KEY);
      await localforage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      await authApi.signOut(user!.id);
      location.reload();
    }, setIsLoadingAuth);
  };

  useEffect(() => {
    check();
  }, [check]);

  return {
    isLoadingAuth,
    isAuthenticated,
    user,
    isAdmin,
    signIn,
    signOut,
  };
};
