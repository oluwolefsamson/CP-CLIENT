import * as React from "react";
import {
  LayoutDashboardIcon,
  MapPinIcon,
  LeafIcon,
  SendIcon,
  BellIcon,
  BarChartIcon,
  NewspaperIcon,
  UserIcon,
  LanguagesIcon,
  LogOutIcon,
  ArrowUpCircleIcon,
  Search,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";

import { Input } from "../../components/ui/input";

import { NavMain } from "../../components/ui/nav-main";
import { NavSecondary } from "../../components/ui/nav-secondary";
import { NavUser } from "../../components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import { useSidebar } from "../../components/ui/sidebar";
import LogoImg from "../../assets/images/logo.png";

const data = {
  user: {
    name: "Samson",
    email: "farmer@example.com",
    avatar: "/avatars/farmer.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      size: "default",
    },
    {
      title: "Nearby Markets",
      url: "/dashboard/nearby-market",
      icon: MapPinIcon,
    },
    {
      title: "Crops & Prices",
      url: "/dashboard/crop-price",
      icon: LeafIcon,
    },
    {
      title: "Submit Price",
      url: "/dashboard/submit-price",
      icon: SendIcon,
    },
    {
      title: "Price Alerts",
      url: "/dashboard/price-alert",
      icon: BellIcon,
    },
    {
      title: "Price Trends",
      url: "/dashboard/price-trend",
      icon: BarChartIcon,
    },
    {
      title: "Market News",
      url: "/dashboard/market-news",
      icon: NewspaperIcon,
    },

    {
      title: "Dispute",
      url: "/dashboard/dispute",
      icon: ArrowUpCircleIcon,
    },
  ],
  navSecondary: [
    {
      title: "Profile Settings",
      url: "/dashboard/profile-setting",
      icon: UserIcon,
    },

    {
      title: "Logout",
      url: "/logout",
      icon: LogOutIcon,
    },
  ],
};

export function AppSidebar(props) {
  const { state, setState, openMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  // Detect mobile screen
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props} className="flex flex-col h-screen">
      <SidebarHeader className="!items-start">
        <SidebarMenu
          className={cn(
            "flex flex-col items-center gap-3 lg:gap-3 w-full", // reduce gap
            collapsed ? "px-1 py-2" : "px-3 py-3" // reduce padding
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 w-full", // reduce gap
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <img
              src={LogoImg}
              alt="Logo"
              className={cn(
                "rounded-full border-2 border-green-600 transition-all",
                collapsed ? "h-6 w-6" : "h-8 w-8" // smaller logo
              )}
            />
            {!collapsed && (
              <div
                className="text-xl font-black text-green-600" // smaller brand text
                style={{ fontFamily: "'Poiret One', cursive" }}
              >
                CropWise
              </div>
            )}
            {/* Cancel button for mobile */}
            {!collapsed && isMobile && openMobile && (
              <button
                className="ml-auto p-1 rounded-full bg-gray-200 hover:bg-gray-200 transition-colors"
                onClick={() => setOpenMobile(false)}
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-center w-full">
            {collapsed ? (
              <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
            ) : (
              <div className="w-full relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-9 py-2 rounded-full bg-purple-100 text-purple-600 placeholder:text-purple-400 shadow-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled
                />
              </div>
            )}
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <div className="flex-1 flex flex-col overflow-hidden">
        <SidebarContent className="text-gray-700 flex flex-col h-full no-scrollbar overflow-y-auto text-sm">
          <div className="flex flex-col flex-1 min-h-0">
            <NavMain
              items={data.navMain}
              iconClassName="h-4 w-4"
              textClassName="text-sm"
            />
            <div className="mt-2 flex-1 min-h-0">
              <NavSecondary
                items={data.navSecondary}
                iconClassName="h-4 w-4"
                textClassName="text-sm"
              />
            </div>
          </div>
        </SidebarContent>
      </div>

      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
