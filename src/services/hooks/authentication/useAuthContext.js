

// import { useQueryClient } from "@tanstack/react-query";
// import { useLogin, useRegister, useLogout, useCurrentUser, useVerifyOtp } from "./useAuth";
// import { AUTH_CURRENT_USER, AUTH_LOGIN } from "@/services/queryKeys/authentication/auth";
// import Cookies from "js-cookie";

// export const useAuth = () => {
//   const queryClient = useQueryClient();
  
//   const loginMutation = useLogin();
//   const registerMutation = useRegister();
//   const logoutMutation = useLogout();
//   const currentUserQuery = useCurrentUser();
//   const verifyOtpMutation = useVerifyOtp();

//   const enhancedLogin = async (credentials) => {
//     const result = await loginMutation.login(credentials);
    
//     if (result.token) {
//       Cookies.set("token", result.token);
//     }
    
//     // Invalidate and refetch current user query if it exists
//     if (currentUserQuery && currentUserQuery.refetch) {
//       await currentUserQuery.refetch();
//     } else {
//       // Fallback: invalidate the query to trigger refetch
//       await queryClient.invalidateQueries([AUTH_CURRENT_USER]);
//     }
    
//     return result;
//   };

//   const enhancedLogout = async () => {
//     try {
//       const result = await logoutMutation.logout();
//       Cookies.remove("token");
//       queryClient.removeQueries([AUTH_CURRENT_USER]);
//       queryClient.removeQueries([AUTH_LOGIN]);
//       return result;
//     } catch (error) {

//       Cookies.remove("token");
//       queryClient.removeQueries([AUTH_CURRENT_USER]);
//       queryClient.removeQueries([AUTH_LOGIN]);
//       throw error;
//     }
//   };

//   const isAuthenticated = !!Cookies.get("token") && currentUserQuery?.data && !currentUserQuery.isError;

//   return {
//     isAuthenticated,
//     isLoading: loginMutation.isLoggingIn || registerMutation.isRegistering || currentUserQuery?.isLoading,
    
//     login: enhancedLogin,
//     isLoggingIn: loginMutation.isLoggingIn,
//     loginError: loginMutation.error,
//     loginData: loginMutation.data,
    
//     register: registerMutation.register,
//     isRegistering: registerMutation.isRegistering,
//     registerError: registerMutation.error,
//     registerData: registerMutation.data,

//       // Verify OTP
//     verifyOtp: verifyOtpMutation.verifyOtp,
//     isVerifyingOtp: verifyOtpMutation.isVerifyingOtp,
//     verifyOtpError: verifyOtpMutation.error,
//     verifyOtpData: verifyOtpMutation.data,
    
  
//     logout: enhancedLogout,
//     isLoggingOut: logoutMutation.isLoggingOut,
//     user: currentUserQuery?.data,
//     userLoading: currentUserQuery?.isLoading,
//     userError: currentUserQuery?.error,
//   };
// };


// @/services/hooks/authentication/useAuth.js
import { useQueryClient } from "@tanstack/react-query";
import { 
  useLogin, 
  useRegister, 
  useLogout, 
  useCurrentUser, 
  useVerifyOtp,
  useGoogleAuth,
  useResendOtp // ✅ ADD RESEND OTP
} from "./useAuth";
import { AUTH_CURRENT_USER, AUTH_LOGIN } from "@/services/queryKeys/authentication/auth";
import Cookies from "js-cookie";

export const useAuth = () => {
  const queryClient = useQueryClient();
  
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const currentUserQuery = useCurrentUser();
  const verifyOtpMutation = useVerifyOtp();
  const googleAuthMutation = useGoogleAuth();
  const resendOtpMutation = useResendOtp(); // ✅ ADD RESEND OTP

  // Enhanced login (your existing)
  const enhancedLogin = async (credentials) => {
    const result = await loginMutation.login(credentials);
    
    if (result.token) {
      Cookies.set("token", result.token);
    }
    
    await queryClient.invalidateQueries({ queryKey: [AUTH_CURRENT_USER] });
    
    return result;
  };

  // ✅ ADD ENHANCED GOOGLE AUTH
  const enhancedGoogleAuth = async (googleToken) => {
    const result = await googleAuthMutation.googleAuth(googleToken);
    
    if (result.token) {
      Cookies.set("token", result.token);
    }
    
    // Invalidate and refetch current user
    await queryClient.invalidateQueries({ queryKey: [AUTH_CURRENT_USER] });
    
    return result;
  };

  // ✅ ADD ENHANCED RESEND OTP
  const enhancedResendOtp = async (email) => {
    const result = await resendOtpMutation.resendOtp(email);
    return result;
  };

  // Enhanced logout (your existing)
  const enhancedLogout = async () => {
    try {
      const result = await logoutMutation.logout();
      Cookies.remove("token");
      queryClient.removeQueries({ queryKey: [AUTH_CURRENT_USER] });
      queryClient.removeQueries({ queryKey: [AUTH_LOGIN] });
      return result;
    } catch (error) {
      Cookies.remove("token");
      queryClient.removeQueries({ queryKey: [AUTH_CURRENT_USER] });
      queryClient.removeQueries({ queryKey: [AUTH_LOGIN] });
      throw error;
    }
  };

  const isAuthenticated = !!Cookies.get("token") && currentUserQuery?.data && !currentUserQuery.isError;

  return {
    // Auth state
    isAuthenticated,
    isLoading: loginMutation.isLoggingIn || registerMutation.isRegistering || currentUserQuery?.isLoading || googleAuthMutation.isGoogleAuthLoading || resendOtpMutation.isResendingOtp,
    
    // Traditional login
    login: enhancedLogin,
    isLoggingIn: loginMutation.isLoggingIn,
    loginError: loginMutation.error,
    loginData: loginMutation.data,
    
    // Google OAuth
    googleAuth: enhancedGoogleAuth,
    isGoogleAuthLoading: googleAuthMutation.isGoogleAuthLoading,
    googleAuthError: googleAuthMutation.googleAuthError,
    googleAuthData: googleAuthMutation.googleAuthData,
    
    // Registration
    register: registerMutation.register,
    isRegistering: registerMutation.isRegistering,
    registerError: registerMutation.error,
    registerData: registerMutation.data,

    // Verify OTP
    verifyOtp: verifyOtpMutation.verifyOtp,
    isVerifyingOtp: verifyOtpMutation.isVerifyingOtp,
    verifyOtpError: verifyOtpMutation.error,
    verifyOtpData: verifyOtpMutation.data,

    // ✅ ADD RESEND OTP
    resendOtp: enhancedResendOtp,
    isResendingOtp: resendOtpMutation.isResendingOtp,
    resendOtpError: resendOtpMutation.error,
    resendOtpData: resendOtpMutation.data,
    
    logout: enhancedLogout,
    isLoggingOut: logoutMutation.isLoggingOut,
    
    user: currentUserQuery?.data,
    userLoading: currentUserQuery?.isLoading,
    userError: currentUserQuery?.error,
  };
};