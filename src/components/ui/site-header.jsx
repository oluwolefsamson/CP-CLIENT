import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Separator } from "../../components/ui/separator";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { Input } from "../../components/ui/input";
import { Search, X } from "lucide-react";
import profileImage from "../../assets/images/ProfileSettingImg/Profile-image.png";
import headerBg from "../../assets/images/siteHeader-img.png"; // adjust path and filename

export function SiteHeader({ user }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header
      className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 flex h-16 shrink-0 items-center border-b z-40 sticky top-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${headerBg})`,
      }}
    >
      {/* Overlay to darken/lighten the header background */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm pointer-events-none z-0" />
      {/* You can use bg-black/40 or bg-white/80 depending on your design */}

      <Dialog
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search markets, crops, or news..."
                  className="pl-9 rounded-full bg-gray-50 border-0 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0"
                  autoFocus
                />
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="relative w-full flex items-center justify-between px-4 lg:px-6 z-10">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-9 w-9 p-1.5 hover:bg-gray-100 rounded-lg" />
          <Separator
            orientation="vertical"
            className="h-6 w-[1px] bg-gray-200"
          />
          <h1 className="text-sm md:text-lg font-semibold text-gray-700">
            Welcome {user?.name || "User"}!
          </h1>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search markets, crops, or news..."
              className="pl-9 rounded-full bg-gray-50 border-0 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-green-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
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
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 px-4 py-2">
              <img
                src={user?.profileImage || profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-dashed bg-gray-200"
              />
              <span className="text-sm md:text-lg font-semibold text-gray-700">
                {user?.name || "User"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
