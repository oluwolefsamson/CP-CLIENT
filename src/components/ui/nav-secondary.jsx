import * as React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";

export function NavSecondary({ items, collapsed }) {
  const location = useLocation();

  return (
    <SidebarGroup className="">
      {" "}
      <SidebarGroupContent className="">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <NavLink to={item.url}>
                  <SidebarMenuButton
                    className={`flex items-center ${
                      collapsed
                        ? "justify-center  rounded-full"
                        : "gap-2 py-2 w-full rounded-md"
                    } ${
                      isActive
                        ? "bg-green-600 text-white hover:bg-green-700 hover:text-white"
                        : collapsed
                          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          : "text-gray-800 hover:bg-gray-100"
                    } transition-all duration-200`}
                    style={
                      !collapsed && isActive
                        ? { borderRadius: "0 30px 30px 0" }
                        : {}
                    }
                  >
                    <item.icon />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
