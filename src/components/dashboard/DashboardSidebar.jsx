import React from "react";
import {
  BarChart3,
  BookOpen,
  HelpCircle,
  LayoutGrid,
  Search,
  Settings,
  Users,
} from "lucide-react";

import eduraFinancialLogo from "@/assets/EduraFinancialLogo.webp";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const iconMap = {
  dashboard: LayoutGrid,
  menu_book: BookOpen,
  group: Users,
  analytics: BarChart3,
  settings: Settings,
  help: HelpCircle,
};

export default function DashboardSidebar({ navLinks, footerLinks }) {
  return (
    <Sidebar className="text-on-surface" collapsible="offcanvas">
      <SidebarHeader className="bg-surface-container-low px-3 pb-3 pt-5">
        <div className="mb-4 flex items-center space-x-3 px-2">
          <img
            src={eduraFinancialLogo}
            alt="Edura Financial"
            className=" md:w-full md:h-12 h-16 rounded-md object-contain"
          />
        </div>
        {/* <SidebarSeparator className="bg-outline-variant/60 mx-2" /> */}
      </SidebarHeader>

      <SidebarContent className="bg-surface-container-low px-3 ">
        <div className="mb-3 px-2 lg:hidden">
          <div className="relative">
            <Search className="text-on-surface-variant absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <SidebarInput
              placeholder="Search modules, lessons..."
              className="bg-surface-container-lowest h-10 w-full rounded-sm border-none pl-10 pr-4 text-sm placeholder:text-on-surface-variant/60 focus-visible:ring-1 focus-visible:ring-primary/30"
            />
          </div>
        </div>
        <SidebarMenu>
          {navLinks.map((item) => (
            <SidebarMenuItem key={item.label} className="py-0.5">
              <SidebarMenuButton
                asChild
                isActive={item.active}
                className="group data-[active=true]:bg-surface-container-lowest data-[active=true]:text-primary data-[active=true]:font-semibold hover:bg-surface-container-high text-on-surface h-10  rounded-sm px-3"
              >
                <a href="#">
                  {iconMap[item.icon]
                    ? React.createElement(iconMap[item.icon], {
                        className:
                          "h-5 w-5 text-on-surface-variant group-data-[active=true]:text-primary",
                      })
                    : null}
                  <span className="text-[15px] text-on-surface-variant group-data-[active=true]:text-primary">
                    {item.label}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-surface-container-low gap-3 px-3 pb-4">
        <Button className="bg-primary text-white h-11 w-full rounded-sm font-semibold shadow-lg hover:shadow-xl">
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
                    {iconMap[item.icon]
                      ? React.createElement(iconMap[item.icon], {
                          className: "h-5 w-5 text-on-surface-variant",
                        })
                      : null}
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
