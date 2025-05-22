import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Separator } from "../../components/ui/separator";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { Input } from "../../components/ui/input";
import { Search, X } from "lucide-react";

export function SiteHeader({ user }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "Guest"
  )}&background=0D8ABC&color=fff&rounded=true&size=64`;

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 flex h-16 shrink-0 items-center border-b bg-white">
      {/* Mobile Search Modal */}
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

      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-9 w-9 p-1.5 hover:bg-gray-100 rounded-lg" />
          <Separator
            orientation="vertical"
            className="h-6 w-[1px] bg-gray-200"
          />
          <h1 className="text-lg font-semibold text-gray-900">
            Farmer Dashboard
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

          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "farmer@example.com"}
            </p>
          </div>
          <img
            src={user?.avatar || fallbackAvatar}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
          />
        </div>
      </div>
    </header>
  );
}
