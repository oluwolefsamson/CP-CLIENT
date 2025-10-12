import { post, get } from "@/services/axios";

export const login = (credentials) => {
  return post("/auth/login", credentials);
};

export const register = (userData) => {
  return post("/auth/register", userData);
};

// Add logout if you have the endpoint
export const logout = () => {
  return post("/auth/logout");
};

// Add getCurrentUser if you have the endpoint
export const getCurrentUser = () => {
  return get("/auth/me");
};