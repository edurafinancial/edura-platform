import React from "react";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardNavbar() {
  return (
    <header className="bg-surface/80 border-surface-container sticky top-0 z-40 flex w-full items-center justify-between border-b px-8 py-3 backdrop-blur-md lg:px-8">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h3 className="text-secondary text-sm font-semibold uppercase tracking-wider">
          Dashboard
        </h3>
      </div>
      <div className="mx-8 max-w-md flex-1">
        <div className="relative group">
          <span className="material-symbols-outlined text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2 text-xl">
            search
          </span>
          <Input
            className="bg-surface-container-low h-9 w-full rounded-full border-none py-2 pl-10 pr-4 text-sm placeholder:text-on-surface-variant/60 focus-visible:ring-1 focus-visible:ring-primary/30"
            placeholder="Search modules, lessons..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon-sm">
          <span className="material-symbols-outlined text-on-surface-variant">
            notifications
          </span>
        </Button>
        <Button variant="ghost" size="icon-sm">
          <span className="material-symbols-outlined text-on-surface-variant">
            help
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <Avatar size="sm" className="bg-primary-container/20">
                <AvatarImage
                  alt="User Avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQyxYt5HpnbbTMMGCFSNFnHrBujHAK4tb0fdzNDOkGObnWP3Vso-YLfJiWcZLAaUkOHozM9pH1KgzNJzWMTEraPrptwhpdCvmxJRZYE6VnMb1pyy8it61z_P-s7NF32YSKd34JbG4hW71TOQyrbs8IkI3NFeMjIEzidRLC517oqKianD8-Cfh7kmtJBSvbqllLiJuFVLi7kZ9X04GnUXd8IWZinB54FfZ355xuuWIUqH6Mtce66lV6Ub_JILdZZmQTfRwYoPal0Do"
                />
                <AvatarFallback>EA</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
