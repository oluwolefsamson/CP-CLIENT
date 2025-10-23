import { Outlet } from "react-router-dom";
import { AppSidebar } from "../../components/ui/app-sidebar";
import { SiteHeader } from "../../components/ui/site-header";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import dashboardBg from "../../assets/images/dashboard-bg.png"; 

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div
          className="flex flex-1 flex-col bg-cover bg-center"
          style={{
            backgroundImage: `url(${dashboardBg})`,
          }}
        >
          <div className="@container/main flex flex-1 flex-col gap-2 ">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
