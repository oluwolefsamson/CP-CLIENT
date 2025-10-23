// import { post, get } from "@/services/axios";

// export const login = (credentials) => {
//   return post("/auth/login", credentials);
// };

// export const register = (userData) => {
//   return post("/auth/register", userData);
// };

// export const verifyOtp = (data) => {
//   return post("/auth/verify-otp", data);
// };

// // ✅ ADD GOOGLE AUTH
// export const googleAuth = (token) => {
//   return post("/auth/google-login", { token });
// };


// // Add logout if you have the endpoint
// export const logout = () => {
//   return post("/auth/logout");
// };

// // Add getCurrentUser if you have the endpoint
// export const getCurrentUser = () => {
//   return get("/auth/me");
// };


// @/services/endpoints/authentication/auth.js
import { post, get } from "@/services/axios";

export const login = (credentials) => {
  return post("/auth/login", credentials);
};

export const register = (userData) => {
  return post("/auth/register", userData);
};

export const verifyOtp = (data) => {
  return post("/auth/verify-otp", data);
};

// ✅ ADD RESEND OTP
export const resendOtp = (email) => {
  return post("/auth/send-otp", { email });
};

// ✅ UPDATED: Correct endpoint name
export const googleAuth = (token) => {
  return post("/auth/google-login", { token });
};

// ✅ ADD LOGOUT
export const logout = () => {
  return post("/auth/logout");
};

// ✅ ADD GET CURRENT USER
export const getCurrentUser = () => {
  return get("/auth/me");
};