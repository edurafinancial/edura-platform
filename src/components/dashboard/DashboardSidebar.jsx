import React from "react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export default function DashboardSidebar({ navLinks, footerLinks }) {
  return (
    <Sidebar className="text-on-surface" collapsible="offcanvas">
      <SidebarHeader className="bg-surface-container-low px-3 pb-3 pt-5">
        <div className="mb-4 flex items-center space-x-3 px-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg text-white font-black">
            E
          </div>
          <div>
            <h1 className="font-headline text-on-surface text-lg font-black leading-tight">
              Edura Admin
            </h1>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">
              Financial Panel
            </p>
          </div>
        </div>
        {/* <SidebarSeparator className="bg-outline-variant/60 mx-2" /> */}
      </SidebarHeader>

      <SidebarContent className="bg-surface-container-low px-3">
        <SidebarMenu>
          {navLinks.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={item.active}
                className="data-[active=true]:bg-surface-container-lowest data-[active=true]:text-primary data-[active=true]:font-semibold hover:bg-surface-container-high text-on-surface-variant h-10 rounded-md px-3 "
              >
                <a href="#">
                  <span className="material-symbols-outlined text-neutral-600 text-[20px]">
                    {item.icon}
                  </span>
                  <span className="text-[15px]">{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-surface-container-low gap-3 px-3 pb-4">
        <Button className="bg-primary text-white h-11 w-full rounded-md font-semibold shadow-lg hover:shadow-xl">
          New Report
        </Button>
        <div className="border-outline-variant/60 border-t pt-3">
          <SidebarMenu>
            {footerLinks.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  className="text-on-surface-variant hover:bg-surface-container-high h-9 rounded-lg px-3"
                >
                  <a href="#">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
