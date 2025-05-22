import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";

export function NavMain({ items, collapsed }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <NavLink to={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex items-center ${
                      collapsed
                        ? "justify-center p-3 rounded-full"
                        : "gap-2 px-4 py-2 w-full"
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
                    {item.icon && <item.icon />}
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
