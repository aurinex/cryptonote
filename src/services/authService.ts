const API = "http://localhost:8000";

export const registerEmail = async (
  email: string,
  name: string,
  surname: string,
) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, surname }),
  });

  return res.json();
};

export const verifyCode = async (email: string, code: string) => {
  const res = await fetch(`${API}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  return res.json();
};
