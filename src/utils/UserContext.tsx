import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/userService";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) return;

    const loadUser = async () => {
      const data = await getUser(userId);

      setUser(data);
    };

    loadUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
