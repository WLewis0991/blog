import axios from "axios"

export const api = axios.create({
  baseURL: "https://blog-1p3r.onrender.com",
});

export async function login(username: string, password: string) {
  const res = await api.post("auth/login", { username, password });
  return res.data;
}

export async function register(username: string, password: string) {
  const res = await api.post("auth/register", { username, password });
  return res.data;
}