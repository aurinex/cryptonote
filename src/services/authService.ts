import { API_BASE } from "./api";

export const loginEmail = async (email: string) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (data.code) console.log("Код для входа:", data.code);
  return data;
};

export const registerEmail = async (
  email: string,
  name: string,
  surname: string,
) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, surname }),
  });
  const data = await res.json();
  if (data.code) console.log("Код для регистрации:", data.code);
  return data;
};

export const verifyCode = async (email: string, code: string) => {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  return res.json();
};