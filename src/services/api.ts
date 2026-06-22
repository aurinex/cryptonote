const envApi = (import.meta as any).env.VITE_API_URL;
export const API_BASE = envApi ?? `http://${window.location.hostname}:8000`;
export const getVerifyUrl = (hash: string) => `${window.location.origin}/verify/${hash}`;