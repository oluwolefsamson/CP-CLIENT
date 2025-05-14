import React, { useEffect, useState } from "react";
import { BiX, BiShow, BiHide, BiChevronLeft } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

const OnboardingSlider = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    otp: Array(6).fill(""),
  });

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setFormData({
        email: "",
        password: "",
        name: "",
        otp: Array(6).fill(""),
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
          </div>
        );

      // Updated Case 1 (Signup) and Case 2 (OTP Verification)
      case 1: // Signup
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

      case 2: // OTP Verification
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                We sent a code to{" "}
                {formData.email || "oluwolefsamson44@gmail.com"}
              </p>
            </div>

            <div className="flex justify-center gap-3">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-14 h-14 text-center text-xl border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ))}
            </div>

            <button className="w-full flex items-center justify-center h-[70px] bg-green-600 hover:bg-green-700 text-white rounded-3xl font-medium">
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
          <button
            onClick={onClose}
            className="self-end mb-4 hover:text-primaryColor"
          >
            <BiX className="w-8 h-8" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-[-20px]">
              <h2 className="text-2xl font-bold text-gray-900 mb-[-20px] ">
                {currentStep === 0
                  ? "Welcome Back"
                  : currentStep === 1
                    ? "Create Account"
                    : "Verify Account"}
              </h2>
              <p className="text-gray-600">
                {currentStep === 0
                  ? "Track prices and compare products"
                  : currentStep === 1
                    ? "Join our agricultural community"
                    : "Secure verification process"}
              </p>
            </div>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingSlider;
