const API = "http://localhost:8000";

export const getUser = async (userId: string) => {
  const res = await fetch(`${API}/users/${userId}`);

  return res.json();
};
