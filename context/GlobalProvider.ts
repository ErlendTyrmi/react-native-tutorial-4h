import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext({});
const useGlobalContext = () => useContext(GlobalContext);
const globalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setloading] = useState(false);

  const isLoggedIn = !!user;

  return (
    <GlobalContext.Provider value={{ user, setUser, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};
