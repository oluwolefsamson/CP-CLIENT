import React, { useEffect, useState } from "react";
import { BiX, BiShow, BiHide, BiChevronLeft } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../../ui/input-otp";
import { useAuth } from "@/services/hooks/authentication/useAuthContext";
import { GoogleLogin } from "@react-oauth/google";

const OnboardingSlider = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  
  // Use the auth hook with OTP functionality
  const {
    login,
    register,
    verifyOtp,
    googleAuth,
    resendOtp,
    isLoggingIn,
    isRegistering,
    isVerifyingOtp,
    isGoogleAuthLoading,
    isResendingOtp,
    loginError,
    registerError,
    verifyOtpError,
    googleAuthError,
    resendOtpError,
    isAuthenticated,
    user,
    loginData,
    verifyOtpData,
    googleAuthData
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    otp: Array(6).fill(""),
    resetEmail: "",
    resetOtp: Array(6).fill(""),
    newPassword: "",
    confirmPassword: "",
  });

  const stepTitles = {
    0: "Welcome Back",
    1: "Create Account",
    2: "Verify Account",
    3: "Reset Password",
    4: "Verify Reset Code",
    5: "New Password",
    6: "Success",
    7: "Error",
  };

  const stepMessages = {
    0: "Track prices and compare products",
    1: "Join our agricultural community",
    2: "Secure verification process",
    3: "Enter your email to reset password",
    4: "Check your email for verification code",
    5: "Create a strong new password",
    6: "Password updated successfully",
    7: "There was an issue processing your request",
  };

  // Handle successful authentication for BOTH regular login AND Google login
  useEffect(() => {
    const token = Cookies.get("token");
    if (token && (isAuthenticated || user)) {
      console.log("Authentication successful, navigating to dashboard");
      toast.success("Successfully authenticated!");
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
      }, 1500);
    }
  }, [isAuthenticated, user, navigate, onClose]);

  // Handle successful regular login
  useEffect(() => {
    if (loginData && loginData.token) {
      console.log("Login successful with token:", loginData.token);
      Cookies.set("token", loginData.token);
      toast.success("Login successful! Redirecting to dashboard...");
      
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
      }, 2000);
    }
  }, [loginData, navigate, onClose]);

  // Handle successful Google authentication
  useEffect(() => {
    if (googleAuthData && googleAuthData.token) {
      console.log("Google login successful with token:", googleAuthData.token);
      Cookies.set("token", googleAuthData.token);
      toast.success("Google login successful! Redirecting to dashboard...");
      
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
      }, 2000);
    }
  }, [googleAuthData, navigate, onClose]);

  // Handle successful Google authentication via isAuthenticated
  useEffect(() => {
    const token = Cookies.get("token");
    if (token && isAuthenticated) {
      console.log("Google authentication successful via isAuthenticated");
      // Navigation is handled by the main authentication effect
    }
  }, [isAuthenticated]);

  
  useEffect(() => {
    if (verifyOtpData) {
      console.log("OTP verification response:", verifyOtpData);
      
      // Check for successful OTP verification based on the actual API response
      if (verifyOtpData.message === "OTP verified successfully" || 
          verifyOtpData.message === "Account created successfully" ||
          verifyOtpData.user) {
        
        console.log("OTP verification successful:", verifyOtpData);
        toast.success("Account verified successfully! Please login with your credentials.");
        
        // Clear the form data for fresh login
        setFormData(prev => ({
          ...prev,
          password: "", // Clear password for security
          otp: Array(6).fill(""), // Clear OTP
        }));
        
        // Navigate to login step after a short delay
        setTimeout(() => {
          handleStepNavigation(0);
        }, 1500);
      }
    }
  }, [verifyOtpData]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setFormData({
        email: "",
        password: "",
        name: "",
        otp: Array(6).fill(""),
        resetEmail: "",
        resetOtp: Array(6).fill(""),
        newPassword: "",
        confirmPassword: "",
      });
      setErrorMessage("");
      setCountdown(0);
    }
  }, [isOpen]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleInputChange = (e, index) => {
    if (currentStep === 2) {
      const newOtp = [...formData.otp];
      newOtp[index] = e.target.value;
      setFormData({ ...formData, otp: newOtp });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleStepNavigation = (step) => {
    setCurrentStep(step);
    setErrorMessage("");
  };

  // Handle Google OAuth success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setErrorMessage("");
      
      if (!credentialResponse.credential) {
        toast.error("Google authentication failed. Please try again.");
        return;
      }

      console.log("Google auth successful, sending token to backend...");
      
      // Show loading toast
      const loadingToast = toast.loading("Signing you in with Google...");
      
      await googleAuth(credentialResponse.credential);
      
      // Dismiss loading toast on success
      toast.dismiss(loadingToast);
      
      console.log("Google auth completed, waiting for redirection...");
      
      // The redirection will be handled by the useEffect above
      // that watches googleAuthData and isAuthenticated
      
    } catch (error) {
      console.error("Google auth error:", error);
      const errorMsg = googleAuthError?.message || "Google authentication failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      handleStepNavigation(7);
    }
  };

  // Handle Google OAuth error
  const handleGoogleError = () => {
    console.error("Google OAuth failed");
    toast.error("Google authentication failed. Please try again.");
  };

  // Handle login
  const handleLogin = async () => {
    try {
      setErrorMessage("");
      
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }

      const credentials = {
        email: formData.email,
        password: formData.password
      };
      
      console.log("Attempting login with:", credentials);
      
      // Show loading toast
      const loadingToast = toast.loading("Signing you in...");
      
      await login(credentials);
      
      // Dismiss loading toast on success
      toast.dismiss(loadingToast);
      
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = loginError?.message || "Invalid email or password. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      handleStepNavigation(7);
    }
  };

  // Handle register
  const handleRegister = async () => {
    try {
      setErrorMessage("");
      
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }

      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      
      // Show loading toast
      const loadingToast = toast.loading("Creating your account...");
      
      await register(userData);
      
      // Dismiss and show success
      toast.dismiss(loadingToast);
      toast.success(`Account created! Verification code sent to ${formData.email}`);
      
      handleStepNavigation(2);
      setCountdown(60);
      
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = registerError?.message || "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      handleStepNavigation(7);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      setErrorMessage("");
      const otpCode = formData.otp.join('');
      
      if (otpCode.length !== 6) {
        toast.error("Please enter the complete 6-digit OTP code");
        return;
      }

      const verifyData = {
        email: formData.email,
        otp: otpCode
      };

      console.log("Attempting OTP verification with:", verifyData);
      
      // Show loading toast
      const loadingToast = toast.loading("Verifying your code...");
      
      await verifyOtp(verifyData);
      
      // Dismiss loading toast on success
      toast.dismiss(loadingToast);
      
    } catch (error) {
      console.error("OTP verification error:", error);
      const errorMsg = verifyOtpError?.message || "Invalid verification code. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  // Handle resend OTP - UPDATED TO USE REAL API
  const handleResendOtp = async () => {
    try {
      setErrorMessage("");
      
      if (!formData.email) {
        toast.error("Email is required to resend OTP");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading("Sending new code...");
      
      await resendOtp(formData.email);
      
      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success(`Verification code sent to ${formData.email}`);
      
      setCountdown(60);
      
    } catch (error) {
      console.error("Resend OTP error:", error);
      const errorMsg = resendOtpError?.message || "Failed to resend OTP. Please try again.";
      toast.error(errorMsg);
    }
  };

  // Handle password reset request
  const handleResetPassword = async () => {
    try {
      setErrorMessage("");
      
      if (!formData.resetEmail) {
        toast.error("Please enter your email address");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading("Sending reset code...");
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success(`Reset code sent to ${formData.resetEmail}`);
      
      handleStepNavigation(4);
      setCountdown(60);
      
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send reset code. Please try again.");
      handleStepNavigation(7);
    }
  };

  // Handle reset password verification
  const handleResetPasswordVerify = async () => {
    try {
      const otpCode = formData.resetOtp.join('');
      
      if (otpCode.length !== 6) {
        toast.error("Please enter the complete 6-digit verification code");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading("Verifying reset code...");
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success("Code verified! Please set your new password");
      
      handleStepNavigation(5);
      
    } catch (error) {
      console.error("Reset OTP verification error:", error);
      toast.error("Invalid verification code. Please try again.");
    }
  };

  // Handle new password setup
  const handleNewPassword = async () => {
    try {
      if (!formData.newPassword || !formData.confirmPassword) {
        toast.error("Please fill in both password fields");
        return;
      }

      if (formData.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading("Updating your password...");
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success("Password updated successfully!");
      
      handleStepNavigation(6);
      
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    login: false,
    signup: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-3">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_blue"
                size="large"
                text="continue_with"
                shape="rectangular"
                width="100%"
                disabled={isGoogleAuthLoading || isLoggingIn}
                useOneTap={false}
              />
              {isGoogleAuthLoading && (
                <p className="text-center text-sm text-gray-600">Connecting with Google...</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500">or</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
                value={formData.email}
                disabled={isGoogleAuthLoading}
              />
              <div className="relative">
                <input
                  type={passwordVisibility.login ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                  onChange={handleInputChange}
                  value={formData.password}
                  disabled={isGoogleAuthLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("login")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isGoogleAuthLoading}
                >
                  {passwordVisibility.login ? (
                    <BiHide size={20} />
                  ) : (
                    <BiShow size={20} />
                  )}
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoggingIn || isGoogleAuthLoading}
                className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoggingIn ? "Signing in..." : "Continue"}
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => handleStepNavigation(1)}
                className="text-blue-600 font-medium hover:underline"
                disabled={isGoogleAuthLoading}
              >
                Sign up
              </button>
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              <button
                onClick={() => handleStepNavigation(3)}
                className="text-blue-600 font-medium hover:underline"
                disabled={isGoogleAuthLoading}
              >
                Forgot Password?
              </button>
            </p>
          </div>
        );

      case 1:
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-3">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_blue"
                size="large"
                text="signup_with"
                shape="rectangular"
                width="100%"
                disabled={isGoogleAuthLoading || isRegistering}
                useOneTap={false}
              />
              {isGoogleAuthLoading && (
                <p className="text-center text-sm text-gray-600">Signing up with Google...</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500">or</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
                value={formData.name}
                disabled={isGoogleAuthLoading}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
                value={formData.email}
                disabled={isGoogleAuthLoading}
              />
              <div className="relative ">
                <input
                  type={passwordVisibility.signup ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                  onChange={handleInputChange}
                  value={formData.password}
                  disabled={isGoogleAuthLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("signup")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isGoogleAuthLoading}
                >
                  {passwordVisibility.signup ? (
                    <BiHide size={20} />
                  ) : (
                    <BiShow size={20} />
                  )}
                </button>
              </div>

              <button
                onClick={handleRegister}
                disabled={isRegistering || isGoogleAuthLoading}
                className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRegistering ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => handleStepNavigation(0)}
                className="text-blue-600 font-medium hover:underline"
                disabled={isGoogleAuthLoading}
              >
                Login
              </button>
            </p>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-md space-y-6 px-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                We sent a code to {formData.email}
              </p>
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
            </div>

            <div className="flex justify-center items-center gap-3">
              <InputOTP
                maxLength={6}
                value={formData.otp.join("")}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    otp: value.split(""),
                  }))
                }
              >
                {/* First Group (3 digits) */}
                <InputOTPGroup className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-lg text-center"
                    />
                  ))}
                </InputOTPGroup>

                {/* Dot Separator */}
                <InputOTPSeparator>
                  <span className="mx-2 text-lg">•</span>
                </InputOTPSeparator>

                {/* Second Group (3 digits) */}
                <InputOTPGroup className="flex gap-1">
                  {[3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-lg text-center"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp || formData.otp.join("").length !== 6}
              className="w-full flex items-center justify-center h-[50px] bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifyingOtp ? "Verifying..." : "Verify"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button
                onClick={handleResendOtp}
                disabled={countdown > 0 || isResendingOtp}
                className="text-blue-600 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResendingOtp ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </p>
          </div>
        );

      case 3: // Forgot Password Email Step
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                name="resetEmail"
                placeholder="Enter your email"
                className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
                value={formData.resetEmail}
              />

              <button
                onClick={handleResetPassword}
                className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
              >
                Send Reset Code
              </button>

              <button
                onClick={() => handleStepNavigation(0)}
                className="text-blue-600 font-medium hover:underline text-sm"
              >
                Back to Login
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                We sent a reset code to {formData.resetEmail}
              </p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={formData.resetOtp?.join("") || ""}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    resetOtp: value.split(""),
                  }))
                }
              >
                <InputOTPGroup className="flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-lg text-center"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              onClick={handleResetPasswordVerify}
              className="w-full flex items-center justify-center h-[50px] bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
            >
              Verify Code
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button 
                onClick={handleResendOtp}
                className="text-blue-600 font-medium hover:underline"
                disabled={countdown > 0 || isResendingOtp}
              >
                {isResendingOtp ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </p>
          </div>
        );

      case 5: // New Password Entry
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-1"></div>

            <div className="flex flex-col ">
              <div className="relative">
                <input
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                  onChange={handleInputChange}
                  value={formData.newPassword}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisibility.newPassword ? (
                    <BiHide size={20} />
                  ) : (
                    <BiShow size={20} />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisibility.confirmPassword ? (
                    <BiHide size={20} />
                  ) : (
                    <BiShow size={20} />
                  )}
                </button>
              </div>

              <button
                onClick={handleNewPassword}
                className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
              >
                Reset Password
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <button
              onClick={() => {
                handleStepNavigation(0);
                toast.success("Password reset successful! Please login with your new password.");
              }}
              className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
            >
              Continue to Login
            </button>
          </div>
        );

      case 7: // Error State
        return (
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <BiX className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">Something Went Wrong</h3>
            <p className="text-sm text-gray-600">
              {errorMessage || "Please try again later"}
            </p>
            <button
              onClick={() => setCurrentStep(0)}
              className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
            >
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 h-[85vh] bg-white z-50 rounded-t-2xl shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Updated header with back arrow */}
          <div className="flex justify-between items-start w-full mb-4">
            {currentStep !== 0 && currentStep !== 6 && currentStep !== 7 && (
              <button
                onClick={() => handleStepNavigation(currentStep - 1)}
                className="hover:text-primaryColor"
                disabled={isGoogleAuthLoading}
              >
                <BiChevronLeft className="w-8 h-8" />
              </button>
            )}
            <button
              onClick={onClose}
              className="self-end hover:text-primaryColor ml-auto"
              disabled={isGoogleAuthLoading}
            >
              <BiX className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-[-20px]">
              <h2 className="text-2xl font-bold text-gray-900 mb-[-20px]">
                {stepTitles[currentStep]}
              </h2>
              <p className="text-gray-600">{stepMessages[currentStep]}</p>
            </div>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingSlider;