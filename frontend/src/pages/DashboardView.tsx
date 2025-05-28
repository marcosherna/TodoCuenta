import { SidebarProvider } from "@/components/ui/sidebar";

import AppSideBar from "@/components/AppSideBar";
import AppHeader from "@/components/AppHeader";
import { Outlet } from "react-router";

export default function DashboardView() {
  return (
    <SidebarProvider>
      <AppSideBar />

      <main className="bg-background flex h-screen w-full flex-col overflow-hidden">
        <AppHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
