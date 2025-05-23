import React, { useEffect, useState } from "react";
import { BiX, BiShow, BiHide, BiChevronLeft } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../../ui/input-otp";

const OnboardingSlider = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleVerify = () => {
    navigate("/dashboard");
  };

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
    }
  }, [isOpen]);

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
              <button className="w-full p-3 rounded-full border border-gray-300 flex gap-3 items-center justify-center text-base hover:bg-gray-50">
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>
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
              />
              <div className="relative">
                <input
                  type={passwordVisibility.login ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("login")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisibility.login ? (
                    <BiHide size={20} />
                  ) : (
                    <BiShow size={20} />
                  )}
                </button>
              </div>

              <button
                onClick={() => handleStepNavigation(2)}
                className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
              >
                Continue
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => handleStepNavigation(1)}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              <button
                onClick={() => handleStepNavigation(3)}
                className="text-blue-600 font-medium hover:underline"
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
              <button className="w-full p-3 rounded-full border border-gray-300 flex gap-3 items-center justify-center text-base hover:bg-gray-50">
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>
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
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
              />
              <div className="relative ">
                <input
                  type={passwordVisibility.signup ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  className="w-full py-5 px-3 lg:py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("signup")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisibility.signup ? (
                    <BiHide size={20} />
                  ) : (
                    <BiShow size={20} />
                  )}
                </button>
              </div>

              <button
                onClick={() => handleStepNavigation(2)}
                className="w-full flex items-center justify-center h-[50px] mt-2 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
              >
                Create Account
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => handleStepNavigation(0)}
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        );

        return (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                We sent a code to{" "}
                {formData.email || "oluwolefsamson44@gmail.com"}
              </p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={formData.otp.join("")}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    otp: value.split(""),
                  }))
                }
                containerClassName="justify-center"
              >
                <InputOTPGroup className="gap-3">
                  {formData.otp.map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-14 h-14 text-xl border border-gray-300 rounded-3xl [--ring:rgb(59,130,246)]"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              onClick={handleVerify}
              className="w-full flex items-center justify-center h-[70px] bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
            >
              Verify
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button className="text-blue-600 font-medium hover:underline">
                Resend
              </button>
            </p>
          </div>
        );

        return (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                We sent a code to{" "}
                {formData.email || "oluwolefsamson44@gmail.com"}
              </p>
            </div>

            <div className="flex justify-center">
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
                {/* Group 1 - First two digits */}
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-14 h-14 text-xl border border-gray-300 rounded-3xl [--ring:rgb(59,130,246)]"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-14 h-14 text-xl border border-gray-300 rounded-3xl [--ring:rgb(59,130,246)]"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-14 h-14 text-xl border border-gray-300 rounded-3xl [--ring:rgb(59,130,246)]"
                  />
                </InputOTPGroup>

                <InputOTPSeparator className="mx-2 text-2xl">
                  -
                </InputOTPSeparator>

                <InputOTPGroup className="gap-3">
                  <InputOTPSlot
                    index={4}
                    className="w-14 h-14 text-xl border border-gray-300 rounded-3xl [--ring:rgb(59,130,246)]"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-14 h-14 text-xl border border-gray-300 rounded-3xl [--ring:rgb(59,130,246)]"
                  />
                  <InputOTPSlot
                    index={6}
                    className="w-14 h-14 text-xl border border-gray-300 rounded-3xl [--ring:rgb(59,130,246)]"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Keep the rest of your verify button and resend code */}
            <button
              onClick={handleVerify}
              className="w-full flex items-center justify-center h-[70px] bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
            >
              Verify
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button className="text-blue-600 font-medium hover:underline">
                Resend
              </button>
            </p>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-md space-y-6 px-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                We sent a code to{" "}
                {formData.email || "oluwolefsamson44@gmail.com"}
              </p>
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
              onClick={handleVerify}
              className="w-full flex items-center justify-center h-[50px] bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
            >
              Verify
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button className="text-blue-600 font-medium hover:underline">
                Resend
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
              />

              <button
                onClick={() => handleStepNavigation(4)}
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
                {/* OTP input slots */}
              </InputOTP>
            </div>

            <button
              onClick={() => handleStepNavigation(5)}
              className="w-full flex items-center justify-center h-[50px] bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium"
            >
              Verify Code
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button className="text-blue-600 font-medium hover:underline">
                Resend
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
                onClick={() => handleStepNavigation(6)}
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
              // onClick={() => {
              //   setCurrentStep(0);
              //   onClose();
              // }}
              onClick={() => handleStepNavigation(0)}
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
              >
                <BiChevronLeft className="w-8 h-8" />
              </button>
            )}
            <button
              onClick={onClose}
              className="self-end hover:text-primaryColor ml-auto"
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
