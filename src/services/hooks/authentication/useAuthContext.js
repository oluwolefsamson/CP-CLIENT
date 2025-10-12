

import { useQueryClient } from "@tanstack/react-query";
import { useLogin, useRegister, useLogout, useCurrentUser } from "./useAuth";
import { AUTH_CURRENT_USER, AUTH_LOGIN } from "@/services/queryKeys/authentication/auth";
import Cookies from "js-cookie";

export const useAuth = () => {
  const queryClient = useQueryClient();
  
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const currentUserQuery = useCurrentUser();

  // Enhanced login that stores token and updates cache
  const enhancedLogin = async (credentials) => {
    const result = await loginMutation.login(credentials);
    
    // Store the token in cookies (your axios interceptor will use this)
    if (result.token) {
      Cookies.set("token", result.token);
    }
    
    // Invalidate and refetch current user query if it exists
    if (currentUserQuery && currentUserQuery.refetch) {
      await currentUserQuery.refetch();
    } else {
      // Fallback: invalidate the query to trigger refetch
      await queryClient.invalidateQueries([AUTH_CURRENT_USER]);
    }
    
    return result;
  };

  // Enhanced logout that clears token and cache
  const enhancedLogout = async () => {
    try {
      const result = await logoutMutation.logout();
      // Clear token from cookies
      Cookies.remove("token");
      // Clear all auth-related queries
      queryClient.removeQueries([AUTH_CURRENT_USER]);
      queryClient.removeQueries([AUTH_LOGIN]);
      return result;
    } catch (error) {
      // Even if API call fails, clear local auth
      Cookies.remove("token");
      queryClient.removeQueries([AUTH_CURRENT_USER]);
      queryClient.removeQueries([AUTH_LOGIN]);
      throw error;
    }
  };

  // Check authentication status based on token presence AND successful user query
  const isAuthenticated = !!Cookies.get("token") && currentUserQuery?.data && !currentUserQuery.isError;

  return {
    // Authentication status
    isAuthenticated,
    isLoading: loginMutation.isLoggingIn || registerMutation.isRegistering || currentUserQuery?.isLoading,
    
    // Login
    login: enhancedLogin,
    isLoggingIn: loginMutation.isLoggingIn,
    loginError: loginMutation.error,
    loginData: loginMutation.data,
    
    // Register
    register: registerMutation.register,
    isRegistering: registerMutation.isRegistering,
    registerError: registerMutation.error,
    registerData: registerMutation.data,
    
    // Logout
    logout: enhancedLogout,
    isLoggingOut: logoutMutation.isLoggingOut,
    
    // Current user
    user: currentUserQuery?.data,
    userLoading: currentUserQuery?.isLoading,
    userError: currentUserQuery?.error,
  };
};