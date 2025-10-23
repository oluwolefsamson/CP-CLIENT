// import { useMutation, useQuery } from "@tanstack/react-query";
// import { login, register, logout, getCurrentUser, verifyOtp,  googleAuth } from "@/services/endpoints/authentication/auth";
// import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CURRENT_USER, AUTH_REGISTER, AUTH_VERIFY_OTP, AUTH_GOOGLE } from "@/services/queryKeys/authentication/auth";


// export const useLogin = () => {
//   const mutation = useMutation({
//     mutationKey: [AUTH_LOGIN],
//     mutationFn: login,
//   });

//   return {
//     login: mutation.mutateAsync,
//     isLoggingIn: mutation.isPending,
//     error: mutation.error,
//     data: mutation.data,
//   };
// };

// // Register hook
// export const useRegister = () => {
//   const mutation = useMutation({
//     mutationKey: [AUTH_REGISTER],
//     mutationFn: register,
//   });

//   return {
//     register: mutation.mutateAsync,
//     isRegistering: mutation.isPending,
//     error: mutation.error,
//     data: mutation.data,
//   };
// };


// export const useVerifyOtp = () => {
//   const mutation = useMutation({
//     mutationKey: [AUTH_VERIFY_OTP],
//     mutationFn: verifyOtp,
//   });

//   return {
//     verifyOtp: mutation.mutateAsync,
//     isVerifyingOtp: mutation.isPending,
//     error: mutation.error,
//     data: mutation.data,
//   };
// };

// export const useCurrentUser = () => {
//   return useQuery({
//     queryKey: [AUTH_CURRENT_USER],
//     queryFn: getCurrentUser,
//   });
// };

// // ✅ ADD GOOGLE AUTH HOOK
// export const useGoogleAuth = () => {
//   const mutation = useMutation({
//     mutationKey: [AUTH_GOOGLE],
//     mutationFn: googleAuth,
//   });

//   return {
//     googleAuth: mutation.mutateAsync,
//     isGoogleAuthLoading: mutation.isPending,
//     googleAuthError: mutation.error,
//     googleAuthData: mutation.data,
//   };
// };

// export const useLogout = () => {
//   const mutation = useMutation({
//     mutationKey: [AUTH_LOGOUT],
//     mutationFn: logout,
//   });

//   return {
//     logout: mutation.mutateAsync,
//     isLoggingOut: mutation.isPending,
//     error: mutation.error,
//   };
// };


// @/services/hooks/authentication/useAuth.js
import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  login, 
  register, 
  logout, 
  getCurrentUser, 
  verifyOtp,  
  googleAuth,
  resendOtp // ✅ ADD RESEND OTP
} from "@/services/endpoints/authentication/auth";
import { 
  AUTH_LOGIN, 
  AUTH_LOGOUT, 
  AUTH_CURRENT_USER, 
  AUTH_REGISTER, 
  AUTH_VERIFY_OTP, 
  AUTH_GOOGLE,
  AUTH_RESEND_OTP // ✅ ADD RESEND OTP KEY
} from "@/services/queryKeys/authentication/auth";

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: [AUTH_LOGIN],
    mutationFn: login,
  });

  return {
    login: mutation.mutateAsync,
    isLoggingIn: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

// Register hook
export const useRegister = () => {
  const mutation = useMutation({
    mutationKey: [AUTH_REGISTER],
    mutationFn: register,
  });

  return {
    register: mutation.mutateAsync,
    isRegistering: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useVerifyOtp = () => {
  const mutation = useMutation({
    mutationKey: [AUTH_VERIFY_OTP],
    mutationFn: verifyOtp,
  });

  return {
    verifyOtp: mutation.mutateAsync,
    isVerifyingOtp: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

// ✅ ADD RESEND OTP HOOK
export const useResendOtp = () => {
  const mutation = useMutation({
    mutationKey: [AUTH_RESEND_OTP],
    mutationFn: resendOtp,
  });

  return {
    resendOtp: mutation.mutateAsync,
    isResendingOtp: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [AUTH_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

// ✅ ADD GOOGLE AUTH HOOK
export const useGoogleAuth = () => {
  const mutation = useMutation({
    mutationKey: [AUTH_GOOGLE],
    mutationFn: googleAuth,
  });

  return {
    googleAuth: mutation.mutateAsync,
    isGoogleAuthLoading: mutation.isPending,
    googleAuthError: mutation.error,
    googleAuthData: mutation.data,
  };
};

export const useLogout = () => {
  const mutation = useMutation({
    mutationKey: [AUTH_LOGOUT],
    mutationFn: logout,
  });

  return {
    logout: mutation.mutateAsync,
    isLoggingOut: mutation.isPending,
    error: mutation.error,
  };
};