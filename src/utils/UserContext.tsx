import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getUser } from "../services/userService";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(() => {
    const guest = localStorage.getItem("guest");
    if (guest === "true") return { name: "Гость", surname: "", _id: null };
    return null;
  });

  const loadUser = useCallback(async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      const guest = localStorage.getItem("guest");
      if (guest === "true") setUser({ name: "Гость", surname: "", _id: null });
      else setUser(null);
      return;
    }
    const data = await getUser(userId);
    setUser(data);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    localStorage.removeItem("guest");
    setUser(null);
  }, []);

  const refreshUser = useCallback(() => {
    loadUser();
  }, [loadUser]);

  return (
    <UserContext.Provider value={{ user, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);