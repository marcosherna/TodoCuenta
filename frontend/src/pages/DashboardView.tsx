import { SidebarProvider } from "@/components/ui/sidebar";

import AppSideBar from "@/components/AppSideBar";
import AppHeader from "@/components/AppHeader";

export default function DashboardView() {
  return (
    <SidebarProvider>
      <AppSideBar />

      <main className="bg-background flex h-screen w-full flex-col overflow-hidden">
        <AppHeader />
        {/* <SidebarTrigger /> */}
      </main>
    </SidebarProvider>
  );
}
