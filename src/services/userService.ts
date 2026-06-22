import { API_BASE } from "./api";

export const getUser = async (userId: string) => {
  const res = await fetch(`${API_BASE}/users/${userId}`);

  return res.json();
};
