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
} from "lucide-react";

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
  ],
  navSecondary: [
    {
      title: "Profile Settings",
      url: "/dashboard/profile-setting",
      icon: UserIcon,
    },
    {
      title: "Language",
      url: "/dashboard/language",
      icon: LanguagesIcon,
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOutIcon,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props} className="flex flex-col h-screen">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu></SidebarMenu>
      </SidebarHeader>

      {/* Modified content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SidebarContent className="text-gray-800 flex flex-col h-full">
          <NavMain items={data.navMain} />
          <div className="mt-4 flex-1 overflow-y-auto">
            <NavSecondary items={data.navSecondary} />
          </div>
        </SidebarContent>
      </div>

      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
