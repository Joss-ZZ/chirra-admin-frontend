import { useContext } from "react";
import { AuthContext } from "../../components/auth";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useStoresContext must be used within a StoresProvider");
  }
  return context;
};
