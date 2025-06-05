import React, { useRef, useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import defaultProfile from "../../assets/images/ProfileSettingImg/Profile-image.png";

const navItems = [
  {
    id: "personal",
    icon: "user",
    label: "Personal Information",
    active: true,
  },
  {
    id: "farm",
    icon: "tractor",
    label: "Farm Details",
  },
  {
    id: "location",
    icon: "location",
    label: "Farm Location",
  },
  {
    id: "security",
    icon: "lock",
    label: "Security Settings",
  },
  {
    id: "payment",
    icon: "credit-card",
    label: "Payment Methods",
  },
  {
    id: "notifications",
    icon: "bell",
    label: "Notifications",
  },
  {
    id: "connections",
    icon: "link",
    label: "Connected Services",
  },
  {
    id: "preferences",
    icon: "settings",
    label: "Preferences",
  },
];

const ProfileSetting = () => {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [fullName, setFullName] = useState("Oluwole Samson");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle file upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input clickS
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Remove image (reset to default)
  const handleRemoveImage = () => {
    setProfileImage(defaultProfile);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex flex-col items-center mb-6">
                  <Skeleton className="w-24 h-24 rounded-full mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-28 mb-2" />
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="space-y-2">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full rounded-xl" />
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Main Content Skeleton */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Skeleton className="w-32 h-32 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-48" />
                    <div className="flex space-x-3">
                      <Skeleton className="h-10 w-32 rounded-lg" />
                      <Skeleton className="h-10 w-24 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <Skeleton className="h-5 w-24 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-10 w-32 rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Skeleton className="h-12 w-40 rounded-lg" />
                <div className="flex space-x-3">
                  <Skeleton className="h-12 w-40 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - User Profile Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-dashed bg-gray-200 mx-auto"
                  />
                  <button
                    className="absolute bottom-1 right-1 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                    onClick={triggerFileInput}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-800">
                  Oluwole Samson
                </h3>
                <p className="text-gray-500 text-sm mt-1">User Profile</p>
                <div className="mt-3 flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Verified Account</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Profile Settings
                </h3>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full flex items-center text-sm py-3 px-4 rounded-xl transition-colors ${
                        item.active
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-3">
                        {item.icon === "user" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        )}
                        {item.icon === "tractor" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {item.icon === "location" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                        {item.icon === "lock" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        )}
                        {item.icon === "credit-card" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        )}
                        {item.icon === "bell" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                        )}
                        {item.icon === "link" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        )}
                        {item.icon === "settings" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}

                  <button className="w-full flex items-center py-3 px-4 rounded-xl transition-colors text-gray-600 hover:bg-gray-50">
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </span>
                    <span>Logout</span>
                  </button>
                </nav>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Account Status
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscription</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage</span>
                    <span className="font-medium">2.7GB/5GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Login</span>
                    <span className="font-medium">Today, 08:42 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Profile Settings
              </h2>
              <p className="text-gray-600">
                Manage your personal information, security settings, and
                preferences
              </p>
            </div>

            {/* Photo Upload Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Profile Photo
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-xl object-cover border-2 border-dashed bg-gray-200"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                    onClick={triggerFileInput}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-3">
                    At least 800×800 px recommended. JPG or PNG is allowed
                  </p>
                  <div className="flex space-x-3">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                      onClick={triggerFileInput}
                      type="button"
                    >
                      Upload New Photo
                    </button>
                    <button
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                      onClick={handleRemoveImage}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition"
                      value="oluwolefsamson44@gmail.com"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition"
                      value="+234 903 123 4567"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Role
                  </label>
                  <div className="relative">
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition appearance-none bg-white">
                      <option>Farm Owner</option>
                      <option>Farm Manager</option>
                      <option>Agronomist</option>
                      <option>Field Technician</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Details Section */}
            {/* <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Farm Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Farm Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition"
                    value="Greenfield Farms"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Farm ID
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition bg-gray-50"
                    value="CW-AG-7890"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Primary Crop
                  </label>
                  <div className="relative">
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition appearance-none bg-white">
                      <option>Corn</option>
                      <option>Soybeans</option>
                      <option>Wheat</option>
                      <option>Cotton</option>
                      <option>Rice</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Farm Size (acres)
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition"
                    value="1200"
                  />
                </div>
              </div>
            </div> */}

            {/* Security Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Password</h4>
                    <p className="text-gray-600 text-sm">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                    Change Password
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Add an extra layer of security
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">Disabled</span>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Active Sessions
                    </h4>
                    <p className="text-gray-600 text-sm">
                      2 devices currently logged in
                    </p>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center">
                Save Changes
              </button>
              <div className="flex space-x-3">
                <button className="py-3 px-6 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors flex items-center">
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
