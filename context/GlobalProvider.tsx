import { getCurrentUser } from "@/lib/appwrite";
import React, {
  createContext,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
  useState,
} from "react";

interface ContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<ContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
});

export const useGlobalContext = () => useContext(context);

type ContextProviderProps = {
  children?: ReactNode;
};

export const GlobalProvider = ({ children }: ContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Try load user on mount
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <context.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        user: user,
        setUser: setUser,
        loading: loading,
        setLoading: setLoading,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalProvider;
