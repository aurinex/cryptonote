export const API_BASE = `http://${window.location.hostname}:8000`;
export const getVerifyUrl = (hash: string) => `${window.location.origin}/verify/${hash}`;