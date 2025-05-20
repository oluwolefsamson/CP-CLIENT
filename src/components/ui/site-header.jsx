import { Separator } from "../../components/ui/separator";
import { SidebarTrigger } from "../../components/ui/sidebar";

export function SiteHeader({ user }) {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "Guest"
  )}&background=0D8ABC&color=fff&rounded=true&size=64`;

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-[100px] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-6"
          />
          <h1 className=" font-bold text-2xl  text-green-600 select-none transition-colors duration-300 ease-in-out">
            Welcome, <span className="capitalize">{user?.name || "Guest"}</span>
          </h1>
        </div>
        <img
          src={user?.avatar || fallbackAvatar}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-sky-600"
        />
      </div>
    </header>
  );
}
