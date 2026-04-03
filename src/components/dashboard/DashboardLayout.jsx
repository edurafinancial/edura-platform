import React from "react";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children, navLinks, footerLinks }) {
  return (
    <SidebarProvider>
      <DashboardSidebar navLinks={navLinks} footerLinks={footerLinks} />
      <SidebarInset className="bg-surface min-h-screen">
        <div className="flex min-h-svh flex-col">
          <DashboardNavbar />
          <div className="mx-auto w-full max-w-6xl p-8 lg:px-0">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
